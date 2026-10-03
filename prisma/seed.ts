import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { servicesData } from "../app/data/servicesData";
import { subServicesData } from "../app/data/subServicesData";

const prisma = new PrismaClient();

const initialPackages = [
  {
    slug: "wedding-package",
    title: "Premium Wedding Package",
    category: "Luxury, Events",
    duration: "1 day",
    price: "Call for price",
    originalPrice: "Special Offer",
    imageSrc: "/fleet/mercedes-s-class.jpg",
    rating: 5,
    reviewsCount: 42,
    isSale: true,
    link: "/services/luxury-cars/mercedes-s-class",
    order: 1,
  },
  {
    slug: "northern-tour-package",
    title: "Northern Areas Expedition",
    category: "SUV, Off-road, Tour",
    duration: "7 days",
    price: "Custom Quote",
    originalPrice: "Custom Quote",
    imageSrc: "/fleet/land-cruiser-v8.jpg",
    rating: 5,
    reviewsCount: 38,
    isSale: false,
    link: "/services/suv-rentals/land-cruiser-v8",
    order: 2,
  }
];

const initialDestinations = [
  {
    name: "Lahore City Tour",
    country: "Pakistan",
    imageSrc: "/fleet/honda-civic-rs.jpg",
    visaType: "City Travel",
    processingTime: "Instant Booking",
    highlight: "Comfortable sedans for city exploring",
    link: "/services/economy-cars/honda-civic-rs",
    category: "local",
    order: 1,
  },
  {
    name: "Hunza & Skardu Trip",
    country: "Pakistan",
    imageSrc: "/fleet/prado-tx.jpg",
    visaType: "Northern Trip",
    processingTime: "Advance Booking",
    highlight: "Powerful SUVs for mountains",
    link: "/services/suv-rentals/prado-tx",
    category: "northern",
    order: 2,
  }
];

async function main() {
  console.log("🌱 Starting Neon PostgreSQL Database Seed for Moeez Gujjar Rent A Car...");

  await prisma.package.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.subService.deleteMany();
  await prisma.service.deleteMany();

  // 1. Seed Admin Account
  const hashedPassword = await bcrypt.hash("Admin@RentACar2026!", 10);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@moeezgujjarrentacar.com" },
    update: {},
    create: {
      email: "admin@moeezgujjarrentacar.com",
      password: hashedPassword,
      name: "Moeez Gujjar Admin",
      role: "SUPER_ADMIN",
    },
  });
  console.log(`✅ Admin account initialized: ${admin.email}`);

  // 2. Seed Services
  let serviceOrder = 1;
  for (const [slug, service] of Object.entries(servicesData)) {
    await prisma.service.upsert({
      where: { slug },
      update: {
        title: service.title,
        shortDesc: service.shortDesc,
        heroImage: service.heroImage,
        tagline: service.tagline,
        overview: service.overview,
        benefits: service.benefits,
        order: serviceOrder++,
      },
      create: {
        slug: service.slug,
        title: service.title,
        shortDesc: service.shortDesc,
        heroImage: service.heroImage,
        tagline: service.tagline,
        overview: service.overview,
        benefits: service.benefits,
        order: serviceOrder++,
      },
    });
  }
  console.log("✅ Core Services seeded successfully.");

  // 3. Seed Sub-Services
  for (const [slug, sub] of Object.entries(subServicesData)) {
    await prisma.subService.upsert({
      where: { slug },
      update: {
        parentSlug: sub.parentSlug,
        parentTitle: sub.parentTitle,
        title: sub.title,
        subtitle: sub.subtitle,
        badge: sub.badge,
        image: sub.image,
        priceOrFee: sub.priceOrFee,
        durationOrProcessing: sub.durationOrProcessing,
        validity: sub.validity,
        overview: sub.overview,
        requirements: sub.requirements,
        inclusions: sub.inclusions,
        stepsOrItinerary: sub.stepsOrItinerary,
        faqs: sub.faqs,
      },
      create: {
        slug: sub.slug,
        parentSlug: sub.parentSlug,
        parentTitle: sub.parentTitle,
        title: sub.title,
        subtitle: sub.subtitle,
        badge: sub.badge,
        image: sub.image,
        priceOrFee: sub.priceOrFee,
        durationOrProcessing: sub.durationOrProcessing,
        validity: sub.validity,
        overview: sub.overview,
        requirements: sub.requirements,
        inclusions: sub.inclusions,
        stepsOrItinerary: sub.stepsOrItinerary,
        faqs: sub.faqs,
      },
    });
  }
  console.log("✅ Cars (Sub-Services) seeded successfully.");

  // 4. Seed Featured Tour Packages
  for (const pkg of initialPackages) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
  }
  console.log("✅ Featured Rental Packages seeded successfully.");

  // 5. Seed Popular Destinations
  for (const dest of initialDestinations) {
    const existing = await prisma.destination.findFirst({
      where: { name: dest.name },
    });
    if (existing) {
      await prisma.destination.update({
        where: { id: existing.id },
        data: dest,
      });
    } else {
      await prisma.destination.create({
        data: dest,
      });
    }
  }
  console.log("✅ Popular Use Cases seeded successfully.");

  console.log("🚀 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
