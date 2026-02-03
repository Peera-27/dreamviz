import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { dreamText } = await req.json();

    // ส่งข้อมูลไปหา n8n
    const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dreamText }),
    });

    if (!response.ok) throw new Error("n8n Error");

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}