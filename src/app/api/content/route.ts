import { NextResponse } from "next/server";
import { getStoredSiteConfig, saveStoredSiteConfig } from "@/lib/serverDataStore";

export async function GET() {
  const data = await getStoredSiteConfig();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const ok = await saveStoredSiteConfig(data);
    if (ok) {
      return NextResponse.json({ success: true, message: "Site content updated and saved to disk." });
    }
    return NextResponse.json({ success: false, message: "Could not write to disk" }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
