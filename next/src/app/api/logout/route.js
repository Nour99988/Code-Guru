import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
  cookies().delete("accesstoken");
  return NextResponse.json({ message: "logout" });
}
