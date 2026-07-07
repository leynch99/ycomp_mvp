export type Category = {
  slug: string;
  name: string;
  icon: string;
  count: number;
  description: string;
};

export type Product = {
  slug: string;
  sku: string;
  categorySlug: string;
  category: string;
  brand: string;
  name: string;
  price: number;
  oldPrice?: number;
  stock: number;
  image: string;
  badge?: "Новинка" | "Скидка" | "Хит";
  tags: string[];
  rating: number;
  reviews: number;
  status: "active" | "hidden";
  attributes: Record<string, string>;
  topSpecs: Array<{ label: string; value: string }>;
};

export type Order = {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: "new" | "processing" | "shipped" | "delivered";
  items: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  cover: string;
  excerpt: string;
  relatedProductSlugs: string[];
};

export type FilterGroup = {
  title: string;
  options: Array<{ label: string; count: number; checked?: boolean }>;
};

export function placeholder(label: string, width = 560, height = 420) {
  return `https://placehold.co/${width}x${height}/20262F/8C94A3?text=${encodeURIComponent(label)}`;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("uk-UA").format(price) + " ₴";
}

export const categories: Category[] = [
  {
    slug: "processors",
    name: "Процессоры",
    icon: "CPU",
    count: 214,
    description: "Intel, AMD, AM4, AM5, LGA1700 и актуальные линейки Ryzen/Core"
  },
  {
    slug: "motherboards",
    name: "Материнские платы",
    icon: "MB",
    count: 188,
    description: "Чипсеты, сокеты, форм-факторы ATX, mATX и mini-ITX"
  },
  {
    slug: "videocards",
    name: "Видеокарты",
    icon: "GPU",
    count: 128,
    description: "NVIDIA GeForce RTX, AMD Radeon RX, VRAM, TDP, длина карты"
  },
  {
    slug: "memory",
    name: "Оперативная память",
    icon: "RAM",
    count: 264,
    description: "DDR4, DDR5, частоты, тайминги, комплекты для рабочих станций"
  },
  {
    slug: "ssd",
    name: "SSD / HDD",
    icon: "NVMe",
    count: 342,
    description: "NVMe, SATA, PCIe 5.0, внешние накопители и серверные диски"
  },
  {
    slug: "power",
    name: "Блоки питания",
    icon: "PSU",
    count: 92,
    description: "80 Plus, ATX 3.1, модульные кабели и запас мощности"
  },
  {
    slug: "cases",
    name: "Корпуса",
    icon: "CASE",
    count: 126,
    description: "Mesh-панели, airflow, стекло, компактные и workstation-корпуса"
  },
  {
    slug: "cooling",
    name: "Охлаждение",
    icon: "FAN",
    count: 171,
    description: "Башни, СВО, корпусные вентиляторы, термопасты и крепления"
  }
];

export const products: Product[] = [
  {
    slug: "msi-rtx-5070-ti-ventus-3x-16gb",
    sku: "GPU-MSI-5070TI-V3X",
    categorySlug: "videocards",
    category: "Видеокарты",
    brand: "MSI",
    name: "MSI GeForce RTX 5070 Ti Ventus 3X 16GB",
    price: 44290,
    oldPrice: 48100,
    stock: 9,
    image: placeholder("RTX 5070 Ti Ventus", 560, 420),
    badge: "Новинка",
    tags: ["16GB", "PCIe 5.0", "GDDR7"],
    rating: 4.8,
    reviews: 42,
    status: "active",
    attributes: {
      chip: "NVIDIA GeForce RTX 5070 Ti",
      memory: "16 GB GDDR7",
      bus: "256 bit",
      length: "322 мм",
      power: "285 W",
      connector: "16-pin 12V-2x6"
    },
    topSpecs: [
      { label: "Чип", value: "RTX 5070 Ti" },
      { label: "Память", value: "16 GB GDDR7" },
      { label: "Интерфейс", value: "PCIe 5.0" },
      { label: "Рекомендованный БП", value: "750 W" },
      { label: "Длина", value: "322 мм" }
    ]
  },
  {
    slug: "kingston-fury-beast-ddr5-32gb-6000",
    sku: "RAM-KIN-FB-32-6000",
    categorySlug: "memory",
    category: "Оперативная память",
    brand: "Kingston",
    name: "Kingston FURY Beast DDR5 32GB (2x16) 6000MHz",
    price: 4590,
    stock: 36,
    image: placeholder("FURY Beast DDR5", 460, 340),
    badge: "Хит",
    tags: ["DDR5", "32GB", "CL36"],
    rating: 4.9,
    reviews: 86,
    status: "active",
    attributes: {
      type: "DDR5",
      capacity: "32 GB",
      modules: "2 x 16 GB",
      frequency: "6000 MHz",
      timings: "CL36"
    },
    topSpecs: [
      { label: "Тип", value: "DDR5" },
      { label: "Объем", value: "32 GB" },
      { label: "Частота", value: "6000 MHz" }
    ]
  },
  {
    slug: "be-quiet-pure-power-12m-750w-gold",
    sku: "PSU-BQT-PP12M-750",
    categorySlug: "power",
    category: "Блоки питания",
    brand: "be quiet!",
    name: "be quiet! Pure Power 12 M 750W Gold",
    price: 3890,
    stock: 21,
    image: placeholder("Pure Power 750W", 460, 340),
    tags: ["750W", "80+ Gold", "ATX 3.1"],
    rating: 4.7,
    reviews: 31,
    status: "active",
    attributes: {
      power: "750 W",
      certificate: "80 Plus Gold",
      standard: "ATX 3.1",
      cables: "Fully modular",
      fan: "120 мм"
    },
    topSpecs: [
      { label: "Мощность", value: "750 W" },
      { label: "Сертификат", value: "Gold" },
      { label: "Стандарт", value: "ATX 3.1" }
    ]
  },
  {
    slug: "samsung-990-pro-2tb-nvme",
    sku: "SSD-SAM-990PRO-2TB",
    categorySlug: "ssd",
    category: "SSD / HDD",
    brand: "Samsung",
    name: "Samsung 990 PRO 2TB NVMe PCIe 4.0",
    price: 7290,
    oldPrice: 7890,
    stock: 44,
    image: placeholder("Samsung 990 PRO", 460, 340),
    badge: "Скидка",
    tags: ["2TB", "NVMe", "PCIe 4.0"],
    rating: 4.9,
    reviews: 118,
    status: "active",
    attributes: {
      capacity: "2 TB",
      interface: "PCIe 4.0 x4",
      read: "7450 MB/s",
      write: "6900 MB/s",
      resource: "1200 TBW"
    },
    topSpecs: [
      { label: "Объем", value: "2 TB" },
      { label: "Чтение", value: "7450 MB/s" },
      { label: "Ресурс", value: "1200 TBW" }
    ]
  },
  {
    slug: "amd-ryzen-7-9800x3d",
    sku: "CPU-AMD-R7-9800X3D",
    categorySlug: "processors",
    category: "Процессоры",
    brand: "AMD",
    name: "AMD Ryzen 7 9800X3D 8-Core AM5",
    price: 21990,
    stock: 12,
    image: placeholder("Ryzen 7 9800X3D", 460, 340),
    badge: "Хит",
    tags: ["AM5", "8C/16T", "3D V-Cache"],
    rating: 4.9,
    reviews: 64,
    status: "active",
    attributes: {
      socket: "AM5",
      cores: "8",
      threads: "16",
      boost: "5.2 GHz",
      tdp: "120 W"
    },
    topSpecs: [
      { label: "Сокет", value: "AM5" },
      { label: "Ядра", value: "8 / 16" },
      { label: "TDP", value: "120 W" }
    ]
  },
  {
    slug: "asus-tuf-gaming-b850-plus-wifi",
    sku: "MB-ASUS-B850-TUF",
    categorySlug: "motherboards",
    category: "Материнские платы",
    brand: "ASUS",
    name: "ASUS TUF Gaming B850-PLUS WiFi",
    price: 11990,
    stock: 17,
    image: placeholder("ASUS B850 TUF", 460, 340),
    tags: ["AM5", "DDR5", "Wi-Fi 7"],
    rating: 4.6,
    reviews: 27,
    status: "active",
    attributes: {
      socket: "AM5",
      chipset: "B850",
      memory: "DDR5",
      form: "ATX",
      network: "Wi-Fi 7"
    },
    topSpecs: [
      { label: "Сокет", value: "AM5" },
      { label: "Память", value: "DDR5" },
      { label: "Форм-фактор", value: "ATX" }
    ]
  },
  {
    slug: "fractal-north-xl-mesh",
    sku: "CASE-FRA-NORTH-XL",
    categorySlug: "cases",
    category: "Корпуса",
    brand: "Fractal Design",
    name: "Fractal Design North XL Mesh Charcoal",
    price: 7990,
    stock: 7,
    image: placeholder("Fractal North XL", 460, 340),
    tags: ["E-ATX", "Mesh", "Airflow"],
    rating: 4.8,
    reviews: 19,
    status: "active",
    attributes: {
      form: "E-ATX",
      gpu: "413 мм",
      cooling: "420 мм radiator",
      material: "Steel / mesh",
      fans: "3 x 140 мм"
    },
    topSpecs: [
      { label: "Форм-фактор", value: "E-ATX" },
      { label: "GPU", value: "413 мм" },
      { label: "Вентиляторы", value: "3 x 140 мм" }
    ]
  },
  {
    slug: "noctua-nh-d15-g2",
    sku: "COOL-NOC-NHD15-G2",
    categorySlug: "cooling",
    category: "Охлаждение",
    brand: "Noctua",
    name: "Noctua NH-D15 G2 dual tower cooler",
    price: 6390,
    stock: 14,
    image: placeholder("Noctua NH-D15 G2", 460, 340),
    tags: ["AM5", "LGA1700", "Dual tower"],
    rating: 4.8,
    reviews: 23,
    status: "active",
    attributes: {
      sockets: "AM5 / LGA1700",
      fans: "2 x 140 мм",
      height: "168 мм",
      tdp: "250 W",
      noise: "24.8 dB"
    },
    topSpecs: [
      { label: "Сокеты", value: "AM5 / 1700" },
      { label: "Высота", value: "168 мм" },
      { label: "TDP", value: "250 W" }
    ]
  }
];

export const filters: FilterGroup[] = [
  {
    title: "Бренд",
    options: [
      { label: "MSI", count: 24, checked: true },
      { label: "ASUS", count: 31 },
      { label: "Gigabyte", count: 18 },
      { label: "Sapphire", count: 12 }
    ]
  },
  {
    title: "Объем памяти",
    options: [
      { label: "8 GB", count: 38 },
      { label: "12 GB", count: 27 },
      { label: "16 GB", count: 41, checked: true },
      { label: "24 GB", count: 9 }
    ]
  },
  {
    title: "Интерфейс",
    options: [
      { label: "PCIe 5.0", count: 44, checked: true },
      { label: "PCIe 4.0", count: 83 },
      { label: "PCIe 3.0", count: 6 }
    ]
  },
  {
    title: "Наличие",
    options: [
      { label: "Киев, сегодня", count: 54 },
      { label: "В наличии", count: 119, checked: true },
      { label: "Под заказ", count: 9 }
    ]
  }
];

export const orders: Order[] = [
  {
    id: "#48213",
    customer: "Дмитрий Коваль",
    date: "07.07.2026",
    total: 57360,
    status: "shipped",
    items: ["GPU", "RAM", "PSU"]
  },
  {
    id: "#48212",
    customer: "Олена Петренко",
    date: "07.07.2026",
    total: 21990,
    status: "new",
    items: ["CPU"]
  },
  {
    id: "#48211",
    customer: "Ігор Мельник",
    date: "06.07.2026",
    total: 19280,
    status: "processing",
    items: ["SSD", "MB"]
  },
  {
    id: "#48198",
    customer: "Марія Сидоренко",
    date: "05.07.2026",
    total: 44290,
    status: "delivered",
    items: ["GPU"]
  }
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-calculate-psu",
    title: "Как рассчитать мощность блока питания для RTX 50",
    category: "Гайды",
    date: "02.07.2026",
    readTime: "8 мин",
    author: "YComp Lab",
    cover: placeholder("PSU Calculation Guide", 900, 420),
    excerpt: "Формула с запасом 30%, проверка пиковых нагрузок и типичные ошибки при подборе ATX 3.1.",
    relatedProductSlugs: ["be-quiet-pure-power-12m-750w-gold", "msi-rtx-5070-ti-ventus-3x-16gb"]
  },
  {
    slug: "ddr4-vs-ddr5-2026",
    title: "DDR4 vs DDR5 в 2026: где апгрейд действительно заметен",
    category: "Сравнения",
    date: "26.06.2026",
    readTime: "6 мин",
    author: "YComp Lab",
    cover: placeholder("DDR4 vs DDR5", 620, 380),
    excerpt: "Игры, рендер, работа с памятью и цены комплектов на украинском рынке.",
    relatedProductSlugs: ["kingston-fury-beast-ddr5-32gb-6000"]
  },
  {
    slug: "socket-guide-am5-lga1700",
    title: "Сокеты AM5 и LGA1700: что проверить перед покупкой платы",
    category: "Инструкции",
    date: "20.06.2026",
    readTime: "7 мин",
    author: "YComp Lab",
    cover: placeholder("Socket guide", 620, 380),
    excerpt: "Совместимость BIOS, память, питание CPU и охлаждение без лишних догадок.",
    relatedProductSlugs: ["amd-ryzen-7-9800x3d", "asus-tuf-gaming-b850-plus-wifi"]
  },
  {
    slug: "nvme-ssd-test",
    title: "NVMe SSD: почему скорость чтения не всегда решает",
    category: "Обзоры",
    date: "14.06.2026",
    readTime: "5 мин",
    author: "YComp Lab",
    cover: placeholder("NVMe SSD test", 620, 380),
    excerpt: "Сравниваем ресурс, контроллер, температурный режим и стабильность записи.",
    relatedProductSlugs: ["samsung-990-pro-2tb-nvme"]
  }
];

export const accountStats = [
  { label: "Заказы", value: "12", delta: "+2 за месяц" },
  { label: "Бонусы", value: "2 340 ₴", delta: "Gold", accent: true },
  { label: "Сборки", value: "3", delta: "1 готова к заказу" },
  { label: "Избранное", value: "7", delta: "4 в наличии" }
];

export const adminKpis = [
  { label: "Выручка", value: "2 148 300 ₴", delta: "▲ 12.4%", dir: "up" },
  { label: "Заказы", value: "412", delta: "▲ 6.1%", dir: "up", spark: true },
  { label: "Средний чек", value: "5 214 ₴", delta: "▼ 2.3%", dir: "down" },
  { label: "Конверсия", value: "3.8%", delta: "▲ 0.4 п.п.", dir: "up" }
];

export type InfoPageData = {
  title: string;
  subtitle: string;
  active: string;
  rows: Array<[string, string]>;
  body: string[];
};

export const infoPages: Record<string, InfoPageData> = {
  delivery: {
    title: "Доставка и оплата",
    active: "delivery",
    subtitle: "Новая Почта, самовывоз из шоурума, курьер по Киеву и контроль сроков по складам.",
    rows: [
      ["Новая Почта", "от 0 ₴ при заказе от 10 000 ₴"],
      ["Курьер по Киеву", "сегодня или завтра, 89 ₴"],
      ["Самовывоз", "Киев, Антоновича 176"],
      ["Трекинг", "ТТН появляется в кабинете после отгрузки"]
    ],
    body: [
      "Для комплектующих важны не только сроки, но и сохранность упаковки. Мы проверяем пломбы, фиксируем серийные номера и передаем товар в отделение с защитной упаковкой.",
      "Наличие в городе влияет на срок выдачи: товары со склада Киев доступны быстрее, позиции под заказ показывают отдельный срок в карточке."
    ]
  },
  warranty: {
    title: "Гарантия и сервис",
    active: "warranty",
    subtitle: "Официальная гарантия производителя, диагностика и прозрачный статус обращения.",
    rows: [
      ["Гарантия", "12-36 месяцев по категории"],
      ["Проверка", "серийный номер в заказе"],
      ["Диагностика", "до 14 рабочих дней"],
      ["Статус", "обновляется в личном кабинете"]
    ],
    body: [
      "Гарантийный срок указан в карточке товара и сохраняется в заказе. Для обращения достаточно номера заказа или серийного номера устройства.",
      "Если компонент нужен для рабочей станции, менеджер предложит временную замену из доступного фонда, когда это возможно."
    ]
  },
  faq: {
    title: "FAQ",
    active: "documents",
    subtitle: "Короткие ответы на вопросы о совместимости, оплате, доставке и возвратах.",
    rows: [
      ["Можно проверить совместимость?", "Да, через сборку в кабинете"],
      ["Есть оплата частями?", "LiqPay/Fondy адаптер готов к подключению"],
      ["Можно вернуть товар?", "14 дней при сохранении состояния"],
      ["Есть B2B счета?", "Да, по запросу менеджера"]
    ],
    body: [
      "Если вопрос связан с конкретной сборкой, сохраните ее в кабинете и отправьте менеджеру ссылку. Так мы увидим сокет, память, TDP и ограничения корпуса.",
      "Для консультации по заказу используйте номер заказа: он отображается в кабинете и в письме после оформления."
    ]
  },
  about: {
    title: "О YComp",
    active: "about",
    subtitle: "Интернет-магазин комплектующих для людей, которые сравнивают спецификации, а не обещания.",
    rows: [
      ["Фокус", "комплектующие и сборки ПК"],
      ["Рынок", "Украина"],
      ["Поддержка", "чат, Telegram, Viber"],
      ["Сервис", "сборка, чистка, апгрейд"]
    ],
    body: [
      "YComp строится вокруг точных данных: характеристик, совместимости, наличия и понятных сроков. Поэтому дизайн и интерфейс похожи на техническую спецификацию.",
      "Мы развиваем каталог, конфигуратор и экспертный блог как единую систему принятия решения для покупки комплектующих."
    ]
  },
  contacts: {
    title: "Контакты",
    active: "about",
    subtitle: "Шоурум, отдел продаж, сервис и каналы быстрой связи.",
    rows: [
      ["Шоурум Киев", "ул. Антоновича 176"],
      ["График", "10:00-20:00 ежедневно"],
      ["Продажи", "+380 44 390 78 78"],
      ["Сервис", "service@ycomp.ua"]
    ],
    body: [
      "Перед визитом в шоурум проверьте наличие товара в карточке. Некоторые позиции доступны только на складе и требуют предварительного перемещения.",
      "Для корпоративных заказов менеджер подготовит счет, резерв и спецификацию по каждой позиции."
    ]
  },
  bonuses: {
    title: "Бонусная программа",
    active: "bonuses",
    subtitle: "Баллы за заказы, повышенные уровни кабинета и персональные предложения на апгрейды.",
    rows: [
      ["Начисление", "1% от суммы заказа"],
      ["Gold уровень", "от 50 000 ₴ покупок"],
      ["Списание", "до 20% суммы корзины"],
      ["Срок действия", "12 месяцев"]
    ],
    body: [
      "Бонусы начисляются после получения заказа и отображаются в личном кабинете. Их можно применить к комплектующим, сборкам и сервисным услугам.",
      "Повышенный уровень открывает персональные промокоды, ранний доступ к дефицитным позициям и приоритетные консультации по сборкам."
    ]
  },
  documents: {
    title: "Документы",
    active: "documents",
    subtitle: "Публичная оферта, политика конфиденциальности и базовые правила работы сервиса.",
    rows: [
      ["Публичная оферта", "версия 07.2026"],
      ["Конфиденциальность", "персональные данные"],
      ["Оплата", "LiqPay / Fondy ready"],
      ["B2B документы", "счет и спецификация"]
    ],
    body: [
      "Документы фиксируют правила покупки, оплаты, доставки, возврата и обработки персональных данных.",
      "Для корпоративных заказов менеджер дополнительно подготовит счет, спецификацию и закрывающие документы."
    ]
  }
};

export function getCategory(slug?: string) {
  return categories.find((category) => category.slug === slug) ?? categories[2];
}

export function getProduct(slug?: string) {
  return products.find((product) => product.slug === slug) ?? products[0];
}

export function getBlogPost(slug?: string) {
  return blogPosts.find((post) => post.slug === slug) ?? blogPosts[0];
}

export function getProductsByCategory(categorySlug?: string) {
  if (!categorySlug || categorySlug === "all") {
    return products;
  }

  const byCategory = products.filter((product) => product.categorySlug === categorySlug);
  return byCategory.length > 0 ? byCategory : products;
}

export function statusClass(status: Order["status"]) {
  return {
    new: "st-new",
    processing: "st-processing",
    shipped: "st-shipped",
    delivered: "st-delivered"
  }[status];
}

export function statusLabel(status: Order["status"]) {
  return {
    new: "Новый",
    processing: "В обработке",
    shipped: "Отправлен",
    delivered: "Доставлен"
  }[status];
}
