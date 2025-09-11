import { NextResponse } from "next/server";

export async function GET() {
  const fileUrl =
    "https://cdn.sanity.io/files/p8t70jfu/production/77a18df451e07e9a45a1af0d9aa09bfed71ada29.pdf";

  const response = await fetch(fileUrl);
  const blob = await response.blob();

  return new NextResponse(blob, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=soubor.pdf",
    },
  });
}
