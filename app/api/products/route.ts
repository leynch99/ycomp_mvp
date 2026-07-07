import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/data";

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const category = params.get("category");
  const brand = params.get("brand")?.toLowerCase();
  const memory = params.get("memory")?.toLowerCase();
  const sort = params.get("sort");

  let result = products.filter((product) => product.status === "active");

  if (category) {
    result = result.filter((product) => product.categorySlug === category);
  }

  if (brand) {
    result = result.filter((product) => product.brand.toLowerCase().includes(brand));
  }

  if (memory) {
    result = result.filter((product) =>
      [...product.tags, ...Object.values(product.attributes)].some((value) => value.toLowerCase().includes(memory))
    );
  }

  if (sort === "price_asc") {
    result = [...result].sort((a, b) => a.price - b.price);
  }

  if (sort === "price_desc") {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  const counters = result.reduce<Record<string, number>>((acc, product) => {
    acc[product.brand] = (acc[product.brand] ?? 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({ products: result, counters });
}
