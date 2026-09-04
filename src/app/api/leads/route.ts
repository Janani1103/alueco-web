import { NextResponse } from "next/server";
import { getStoredLeads, saveStoredLeads } from "@/lib/serverDataStore";
import { LeadItem } from "@/lib/types";

export async function GET() {
  const leads = await getStoredLeads();
  return NextResponse.json(leads);
}

export async function POST(req: Request) {
  try {
    const data: Partial<LeadItem> = await req.json();
    const currentLeads = await getStoredLeads();

    const newLead: LeadItem = {
      id: `ALU-LEAD-${(currentLeads.length + 301).toString()}`,
      type: data.type || "quotation",
      customerName: data.customerName || "Anonymous Customer",
      customerPhone: data.customerPhone || "N/A",
      customerEmail: data.customerEmail || "",
      location: data.location || "Sri Lanka",
      productName: data.productName || data.vehicleName || data.systemNeeded || "Aluminium System",
      vehicleName: data.productName || data.vehicleName || data.systemNeeded || "Aluminium System",
      systemNeeded: data.systemNeeded || data.productName || data.vehicleName || "Custom Fabrication",
      estimatedPrice: data.estimatedPrice || 0,
      estimatedBudget: data.estimatedBudget || "Quote Pending",
      notes: data.notes || "",
      status: data.status || "New",
      createdAt: "Just now",
    };

    const updated = [newLead, ...currentLeads];
    await saveStoredLeads(updated);

    return NextResponse.json({ success: true, lead: newLead });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    const currentLeads = await getStoredLeads();

    const updated = currentLeads.map((lead) =>
      lead.id === id ? { ...lead, status } : lead
    );
    await saveStoredLeads(updated);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
