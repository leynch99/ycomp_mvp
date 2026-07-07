import { filters } from "@/lib/data";

export function FilterSidebar() {
  return (
    <aside className="filters" aria-label="Фильтры каталога">
      <div className="filter-block">
        <div className="filter-title">
          Цена <span className="chevron">⌄</span>
        </div>
        <div className="price-range">
          <input aria-label="Минимальная цена" defaultValue="12000" />
          <input aria-label="Максимальная цена" defaultValue="62000" />
        </div>
        <div className="price-slider" aria-hidden="true">
          <span className="fill" />
          <span className="handle h1" />
          <span className="handle h2" />
        </div>
      </div>

      {filters.map((group) => (
        <div className="filter-block" key={group.title}>
          <div className="filter-title">
            {group.title} <span className="chevron">⌄</span>
          </div>
          {group.options.map((option) => (
            <label className={`filter-row${option.checked ? " checked" : ""}`} key={option.label}>
              <span className="flabel">
                <span className="fchk" />
                {option.label}
              </span>
              <span className="fcount">{option.count}</span>
            </label>
          ))}
        </div>
      ))}

      <button className="btn btn-quiet apply-btn">Применить фильтры</button>
      <div className="reset-filters">Сбросить все</div>
    </aside>
  );
}
