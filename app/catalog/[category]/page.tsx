import { CatalogPage } from "@/components/CatalogPage";
import { categories } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  return <CatalogPage categorySlug={params.category} />;
}
