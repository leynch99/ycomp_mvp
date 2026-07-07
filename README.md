# YComp Storefront MVP

Next.js MVP for the YComp computer-components store, generated from the supplied HTML mockups and sitemap brief.

## Run

```powershell
npm.cmd install
npm.cmd run dev
```

The app runs at `http://localhost:3000` by default. If PowerShell blocks `npm`, use `npm.cmd` as shown above.

## Main Routes

- `/` - storefront home
- `/catalog`, `/catalog/videocards` - catalog with filters and product cards
- `/product/msi-rtx-5070-ti-ventus-3x-16gb` - product detail
- `/cart`, `/checkout` - cart and checkout steps
- `/account`, `/account/orders`, `/account/builds` - customer account
- `/blog`, `/blog/how-to-calculate-psu` - blog list and article
- `/admin`, `/admin/orders`, `/admin/products` - admin dashboard
- `/favorites`, `/compare`, `/login`, `/register`
- `/delivery`, `/warranty`, `/faq`, `/about`, `/contacts`

## Backend Scaffolding

- `prisma/schema.prisma` defines the PostgreSQL data model from the brief.
- `/api/products` supports category/brand/memory filtering and sorting.
- `/api/checkout/quote` calculates totals, promo discounts, bonuses, and delivery on the server.
- `/api/delivery/quote` and `/api/payment/intent` are replaceable adapter stubs for Nova Poshta and LiqPay/Fondy.
- `proxy.ts` contains the production route-protection scaffold for account/admin routes.
