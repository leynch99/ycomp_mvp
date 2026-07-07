import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { city?: string; subtotal?: number };
  const city = body.city ?? "Киев";
  const subtotal = body.subtotal ?? 0;

  return NextResponse.json({
    provider: "nova-poshta-adapter",
    city,
    methods: [
      {
        id: "np-warehouse",
        label: "Новая Почта - отделение",
        price: subtotal >= 10000 ? 0 : 79,
        eta: city === "Киев" ? "завтра" : "1-2 дня"
      },
      {
        id: "np-courier",
        label: "Новая Почта - курьер",
        price: 89,
        eta: city === "Киев" ? "завтра до 18:00" : "2 дня"
      },
      {
        id: "showroom",
        label: "Самовывоз из шоурума",
        price: 0,
        eta: city === "Киев" ? "сегодня с 15:00" : "недоступно"
      }
    ]
  });
}
