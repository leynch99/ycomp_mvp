import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { orderId?: string; amount?: number; provider?: string };
  const provider = body.provider ?? "liqpay";

  return NextResponse.json({
    provider,
    orderId: body.orderId ?? "demo-order",
    amount: body.amount ?? 0,
    status: "mock_created",
    redirectUrl: `/checkout?payment=${provider}&status=mock`
  });
}
