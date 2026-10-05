import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { order: "asc" },
    });
    // Format response so both Admin UI and public components read fields cleanly
    const mapped = packages.map((p) => ({
      ...p,
      destination: p.category,
      image: p.imageSrc,
      featured: p.isSale,
      badge: p.isSale ? "Featured" : "Standard",
    }));
    return NextResponse.json({ success: true, data: mapped });
  } catch (error) {
    console.error("GET Packages Error:", error);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const title = data.title;
    const price = data.price;
    const duration = data.duration || "5 Days";
    const imageSrc = data.imageSrc || data.image || "/destinations/dubai.jpg";
    const category = data.category || data.destination || "Tour Package";
    const isSale = data.isSale !== undefined ? Boolean(data.isSale) : Boolean(data.featured);

    if (!title || !price) {
      return NextResponse.json({ error: "Title and Price are required" }, { status: 400 });
    }

    const slug = (data.slug || title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const newPackage = await prisma.package.create({
      data: {
        slug,
        title,
        subtitle: data.subtitle || "",
        badge: data.badge || (isSale ? "Featured" : ""),
        category,
        duration,
        price,
        priceUsd: data.priceUsd || null,
        originalPrice: data.originalPrice || null,
        imageSrc,
        rating: Number(data.rating) || 5,
        reviewsCount: Number(data.reviewsCount) || 20,
        isSale,
        link: data.link || `/services/tour-packages/${slug}`,
        overview: data.overview || "",
        inclusions: data.inclusions || [],
        requirements: data.requirements || [],
        itinerary: data.itinerary || [],
        faqs: data.faqs || [],
        order: Number(data.order) || 0,
      },
    });

    return NextResponse.json({ success: true, data: newPackage });
  } catch (error) {
    console.error("POST Package Error:", error);
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: "Package ID required" }, { status: 400 });

    const title = data.title;
    const category = data.category || data.destination;
    const imageSrc = data.imageSrc || data.image;
    const isSale = data.isSale !== undefined ? Boolean(data.isSale) : data.featured !== undefined ? Boolean(data.featured) : undefined;

    const updateData: any = {};
    if (title) updateData.title = title;
    if (data.subtitle !== undefined) updateData.subtitle = data.subtitle;
    if (data.badge !== undefined) updateData.badge = data.badge;
    if (data.slug) updateData.slug = data.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (category) updateData.category = category;
    if (data.duration) updateData.duration = data.duration;
    if (data.price) updateData.price = data.price;
    if (data.originalPrice !== undefined) updateData.originalPrice = data.originalPrice;
    if (imageSrc) updateData.imageSrc = imageSrc;
    if (data.rating !== undefined) updateData.rating = Number(data.rating);
    if (data.reviewsCount !== undefined) updateData.reviewsCount = Number(data.reviewsCount);
    if (isSale !== undefined) updateData.isSale = isSale;
    if (data.link) updateData.link = data.link;
    if (data.priceUsd !== undefined) updateData.priceUsd = data.priceUsd;
    if (data.overview !== undefined) updateData.overview = data.overview;
    if (data.inclusions !== undefined) updateData.inclusions = data.inclusions;
    if (data.requirements !== undefined) updateData.requirements = data.requirements;
    if (data.itinerary !== undefined) updateData.itinerary = data.itinerary;
    if (data.faqs !== undefined) updateData.faqs = data.faqs;
    if (data.order !== undefined) updateData.order = Number(data.order);

    const updated = await prisma.package.update({
      where: { id: data.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT Package Error:", error);
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Package ID required" }, { status: 400 });

    await prisma.package.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Package deleted successfully" });
  } catch (error) {
    console.error("DELETE Package Error:", error);
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}
