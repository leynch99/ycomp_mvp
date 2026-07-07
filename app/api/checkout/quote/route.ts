import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/data";

type QuoteItem = {
  slug: string;
  qty: number;
};

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as {
    items?: QuoteItem[];
    promoCode?: string;
    bonusToUse?: number;
  };

  const items = body.items?.length ? body.items : products.slice(0, 3).map((product) => ({ slug: product.slug, qty: 1 }));
  const subtotal = items.reduce((sum, item) => {
    const product = products.find((candidate) => candidate.slug === item.slug);
    return sum + (product?.price ?? 0) * Math.max(1, item.qty);
  }, 0);
  const promoDiscount = body.promoCode?.toUpperCase() === "YCOMP10" ? Math.round(subtotal * 0.1) : 0;
  const bonusDiscount = Math.min(body.bonusToUse ?? 0, 2340, Math.max(0, subtotal - promoDiscount));
  const delivery = subtotal > 10000 ? 0 : 89;
  const total = subtotal - promoDiscount - bonusDiscount + delivery;

  return NextResponse.json({
    subtotal,
    promoDiscount,
    bonusDiscount,
    delivery,
    total,
    currency: "UAH"
  });
}
