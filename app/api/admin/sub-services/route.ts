import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceSlug = searchParams.get("service") || searchParams.get("parentSlug");

    const where: any = {};
    if (serviceSlug && serviceSlug !== "ALL") {
      where.parentSlug = serviceSlug;
    }

    const subServices = await prisma.subService.findMany({
      where,
      orderBy: { createdAt: "asc" },
    });

    // Format for both admin UI and general consumer
    const formatted = subServices.map((item : any) => ({
      ...item,
      name: item.title,
      description: item.overview,
      priceStarting: item.priceOrFee,
      currency: "PKR",
      processingTime: item.durationOrProcessing,
      includes: item.inclusions,
      featured: item.isFeatured,
      serviceId: item.parentSlug,
      service: {
        id: item.parentSlug,
        name: item.parentTitle,
        slug: item.parentSlug,
      },
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error("GET /api/admin/sub-services error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sub-services" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const title = body.title || body.name;
    const slug = (body.slug || title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const parentSlug = body.parentSlug || body.serviceId || "visa-processing";
    const parentTitle = body.parentTitle || (parentSlug === "tour-packages" ? "Tour Packages" : parentSlug === "flights" ? "Flight Bookings" : parentSlug === "umrah-hajj" ? "Umrah & Hajj" : "Visa Processing");

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const created = await prisma.subService.create({
      data: {
        parentSlug,
        parentTitle,
        slug,
        title,
        subtitle: body.subtitle || body.tagline || "",
        badge: body.badge || "Featured",
        image: body.image || "/destinations/dubai.jpg",
        priceOrFee: body.priceOrFee || (body.priceStarting ? `PKR ${body.priceStarting}` : "Call for quote"),
        durationOrProcessing: body.durationOrProcessing || body.processingTime || "3-5 Working Days",
        validity: body.validity || "30 Days",
        overview: body.overview || body.description || "",
        requirements: Array.isArray(body.requirements) ? body.requirements : [],
        inclusions: Array.isArray(body.inclusions) ? body.inclusions : Array.isArray(body.includes) ? body.includes : [],
        stepsOrItinerary: Array.isArray(body.stepsOrItinerary) ? body.stepsOrItinerary : [],
        faqs: Array.isArray(body.faqs) ? body.faqs : [],
        isFeatured: body.isFeatured !== undefined ? !!body.isFeatured : !!body.featured,
      },
    });

    // If this is a tour package, sync to Package table as well
    if (parentSlug === "tour-packages") {
      try {
        await prisma.package.upsert({
          where: { slug },
          update: {
            title,
            category: body.subtitle || "Worldwide Tour",
            duration: body.durationOrProcessing || "5 Days",
            price: body.priceOrFee || "Call for quote",
            imageSrc: body.image || "/destinations/dubai.jpg",
            isSale: body.isFeatured !== undefined ? !!body.isFeatured : true,
            link: `/services/tour-packages/${slug}`,
          },
          create: {
            slug,
            title,
            category: body.subtitle || "Worldwide Tour",
            duration: body.durationOrProcessing || "5 Days",
            price: body.priceOrFee || "Call for quote",
            imageSrc: body.image || "/destinations/dubai.jpg",
            isSale: body.isFeatured !== undefined ? !!body.isFeatured : true,
            link: `/services/tour-packages/${slug}`,
          },
        });
      } catch (syncErr) {
        console.warn("Failed to sync Package model:", syncErr);
      }
    }

    return NextResponse.json({ success: true, data: created });
  } catch (error: any) {
    console.error("POST /api/admin/sub-services error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "A sub-service with this slug already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create sub-service" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const id = body.id;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "SubService ID is required for update" },
        { status: 400 }
      );
    }

    const title = body.title || body.name;
    const parentSlug = body.parentSlug || body.serviceId;
    const parentTitle = body.parentTitle || (parentSlug === "tour-packages" ? "Tour Packages" : parentSlug === "flights" ? "Flight Bookings" : parentSlug === "umrah-hajj" ? "Umrah & Hajj" : parentSlug ? "Visa Processing" : undefined);

    const updateData: any = {};
    if (title) updateData.title = title;
    if (body.slug) updateData.slug = body.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (parentSlug) updateData.parentSlug = parentSlug;
    if (parentTitle) updateData.parentTitle = parentTitle;
    if (body.subtitle !== undefined || body.tagline !== undefined) updateData.subtitle = body.subtitle || body.tagline || "";
    if (body.badge !== undefined) updateData.badge = body.badge;
    if (body.image) updateData.image = body.image;
    if (body.priceOrFee !== undefined || body.priceStarting !== undefined) {
      updateData.priceOrFee = body.priceOrFee || (body.priceStarting ? `PKR ${body.priceStarting}` : "Call for quote");
    }
    if (body.durationOrProcessing !== undefined || body.processingTime !== undefined) {
      updateData.durationOrProcessing = body.durationOrProcessing || body.processingTime || "";
    }
    if (body.validity !== undefined) updateData.validity = body.validity;
    if (body.overview !== undefined || body.description !== undefined) {
      updateData.overview = body.overview || body.description || "";
    }
    if (Array.isArray(body.requirements)) updateData.requirements = body.requirements;
    if (Array.isArray(body.inclusions)) updateData.inclusions = body.inclusions;
    else if (Array.isArray(body.includes)) updateData.inclusions = body.includes;
    if (Array.isArray(body.stepsOrItinerary)) updateData.stepsOrItinerary = body.stepsOrItinerary;
    if (Array.isArray(body.faqs)) updateData.faqs = body.faqs;
    if (body.isFeatured !== undefined) updateData.isFeatured = !!body.isFeatured;
    else if (body.featured !== undefined) updateData.isFeatured = !!body.featured;

    const updated = await prisma.subService.update({
      where: { id },
      data: updateData,
    });

    // If this is a tour package, sync to Package table
    if (updated.parentSlug === "tour-packages") {
      try {
        await prisma.package.upsert({
          where: { slug: updated.slug },
          update: {
            title: updated.title,
            category: updated.subtitle || "Worldwide Tour",
            duration: updated.durationOrProcessing || "5 Days",
            price: updated.priceOrFee,
            imageSrc: updated.image,
            isSale: updated.isFeatured,
            link: `/services/tour-packages/${updated.slug}`,
          },
          create: {
            slug: updated.slug,
            title: updated.title,
            category: updated.subtitle || "Worldwide Tour",
            duration: updated.durationOrProcessing || "5 Days",
            price: updated.priceOrFee,
            imageSrc: updated.image,
            isSale: updated.isFeatured,
            link: `/services/tour-packages/${updated.slug}`,
          },
        });
      } catch (syncErr) {
        console.warn("Failed to sync Package update:", syncErr);
      }
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("PUT /api/admin/sub-services error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update sub-service" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "SubService ID is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.subService.findUnique({
      where: { id },
    });

    if (existing) {
      await prisma.subService.delete({
        where: { id },
      });

      // If tour package, also cleanup package table if slug matches
      if (existing.parentSlug === "tour-packages") {
        try {
          await prisma.package.deleteMany({
            where: { slug: existing.slug },
          });
        } catch (pkgErr) {
          console.warn("Failed to delete corresponding Package:", pkgErr);
        }
      }
    }

    return NextResponse.json({ success: true, message: "SubService deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/admin/sub-services error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete sub-service" },
      { status: 500 }
    );
  }
}
