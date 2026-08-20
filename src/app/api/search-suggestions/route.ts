import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getSearchSuggestions } from "@/lib/products/search";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  if (!q.trim()) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const db = getDb();
    const products = await db.products.list();
    const suggestions = getSearchSuggestions(products, q, 8);
    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [] }, { status: 200 });
  }
}
