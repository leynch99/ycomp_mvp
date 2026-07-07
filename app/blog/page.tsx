import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHead } from "@/components/SectionHead";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/lib/data";

const chips = ["Все", "Обзоры", "Гайды", "Инструкции", "Сравнения", "Новости"];

export default function BlogListPage() {
  const [featured, ...posts] = blogPosts;

  return (
    <>
      <SiteHeader />
      <main>
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Блог" }]} />
        </div>
        <section className="blog-head">
          <div className="wrap">
            <div className="eyebrow">YComp lab // guides</div>
            <h1 className="page-title">Блог и гайды</h1>
            <p className="page-sub">Обзоры, инструкции и сравнения, привязанные к реальным товарам каталога.</p>
            <form className="blog-search">
              <input placeholder="Поиск по статьям..." />
            </form>
          </div>
        </section>

        <div className="wrap page-section">
          <div className="cat-chip-row">
            {chips.map((chip, index) => (
              <span className={`cat-chip${index === 0 ? " active" : ""}`} key={chip}>
                {chip}
              </span>
            ))}
          </div>

          <Link className="featured-article" href={`/blog/${featured.slug}`}>
            <div className="blog-media">
              <span className="b-cat-badge">{featured.category}</span>
              <img src={featured.cover} alt={featured.title} />
            </div>
            <div>
              <div className="article-meta">
                {featured.date} // {featured.readTime}
              </div>
              <h2 className="page-title">{featured.title}</h2>
              <p className="muted">{featured.excerpt}</p>
              <div className="author-row">
                <span className="author-avatar" />
                <span>{featured.author}</span>
              </div>
            </div>
          </Link>

          <SectionHead index="01 /" title="Все материалы" />
          <div className="blog-grid">
            {posts.map((post) => (
              <Link className="blog-card" href={`/blog/${post.slug}`} key={post.slug}>
                <div className="blog-media">
                  <span className="b-cat-badge">{post.category}</span>
                  <img src={post.cover} alt={post.title} />
                </div>
                <div className="blog-content">
                  <div className="article-meta">
                    {post.date} // {post.readTime}
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="author-row">
                    <span className="author-avatar" />
                    <span>{post.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
