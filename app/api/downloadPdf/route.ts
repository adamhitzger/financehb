import { NextResponse } from "next/server";

export async function GET() {
  const fileUrl =
    "https://cdn.sanity.io/files/p8t70jfu/production/e60a74ff40d49be94e531ebfceb22aa300db7ecb.pdf";

  const response = await fetch(fileUrl);
  const blob = await response.blob();

  return new NextResponse(blob, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=soubor.pdf",
    },
  });
}
