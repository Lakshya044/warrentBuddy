import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set("token", "", { path: "/", expires: new Date(0) });
  response.cookies.set("name", "", { path: "/", expires: new Date(0) });
  response.cookies.set("email", "", { path: "/", expires: new Date(0) });
  response.cookies.set("role", "", { path: "/", expires: new Date(0) });

  return response;
}
