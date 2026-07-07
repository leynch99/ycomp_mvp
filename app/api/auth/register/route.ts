import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { email?: string; name?: string; phone?: string };

  return NextResponse.json(
    {
      id: "demo-user",
      email: body.email ?? "demo@ycomp.ua",
      phone: body.phone ?? null,
      name: body.name ?? "YComp Customer",
      role: "customer",
      bonusBalance: 0,
      referralCode: "YC-DEMO"
    },
    { status: 201 }
  );
}
