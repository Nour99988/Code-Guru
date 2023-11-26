import { NextResponse } from "next/server";
import { cookies as nextCookies } from "next/headers";

export async function POST(req) {
  const { name, email, password } = await req.json();
  try {
    const apiRes = await fetch("http://localhost:4000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!apiRes.ok) {
      console.error("Error in API response:", apiRes);
      return NextResponse.json({ massage: apiRes.status });
    }

    const allToken = apiRes.headers.getSetCookie();
    const token = allToken[0].split("token=")[1].split(";")[0];
    const refreshToken = allToken[1].split("refreshToken=")[1].split(";")[0];

    nextCookies().set({
      name: "accesstoken",
      value: token,
      httpOnly: true,
      path: "/",
    });

    if (apiRes.status === 400) {
      return NextResponse.json({ massage: apiRes.status }).status(apiRes.status);
    } else if (apiRes.status === 201) {
      return NextResponse.json({ massage: apiRes.status, refreshToken });
    }

    return NextResponse.json({ massage: apiRes.json });
  } catch (err) {
    console.error("Error in fetch:", err);
    return NextResponse.error({ err });
  }
}
