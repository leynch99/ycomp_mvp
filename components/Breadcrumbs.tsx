import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="breadcrumbs">
      {items.map((item, index) => (
        <span key={item.label}>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span className="current">{item.label}</span>}
          {index < items.length - 1 ? <span className="sep">/</span> : null}
        </span>
      ))}
    </div>
  );
}
