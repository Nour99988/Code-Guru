import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function POST(req) {
  const { title, cost } = await req.json();
  const token = cookies().get("accesstoken").value;
  const refrershtoken = req.headers.get("refrershtoken");
  try {
    const apiRes = await fetch("http://localhost:4000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        refrershtoken: refrershtoken,
      },
      //   credentials: true,
      body: JSON.stringify({ title, cost }),
    });
    // const response = await apiRes.json();
    if (!apiRes.ok) {
      //   console.error("Error in API response:", apiRes);
      return NextResponse.json({ massage: apiRes.status });
    }
    const newtoken = allToken[0].split("token=")[1].split(";")[0];
    cookies().set({
      name: "accesstoken",
      value: newtoken,
      httpOnly: true,
      path: "/",
    });
    if (apiRes.status === 201) {
      return NextResponse.json({ message: "Expense created successfully" });
    } else {
      return NextResponse.error({ err: "hapensd wrong qwhen try to add" });
    }
  } catch (err) {
    return NextResponse.error({ err });
  }
}
export async function GET(req) {
  const token = cookies().get("accesstoken").value;
  const refrershtoken = req.headers.get("refrershtoken");
  try {
    const apiRes = await fetch("http://localhost:4000/api/expenses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        refrershtoken: refrershtoken,
      },
    });
    // if (!apiRes.ok) {
    //   //   console.error("Error in API response:", apiRes);
    //   return NextResponse.json({ massage: apiRes.status });
    // }
    const allToken = apiRes.headers.getSetCookie();
    const newtoken = allToken[0].split("token=")[1].split(";")[0];
    console.log(newtoken);
    cookies().set({
      name: "accesstoken",
      value: newtoken,
      httpOnly: true,
      path: "/",
    });
    if (apiRes.status === 200) {
      const data = await apiRes.json();
      return NextResponse.json(data);
    } else {
      const error = await apiRes.json();
      return NextResponse.error({ err: error });
    }
  } catch (err) {
    return NextResponse.error({ err });
  }
}
