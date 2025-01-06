import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbconnect";
import User from "@/model/user/user_model";
import { generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken(user);

    const response = NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );

    response.cookies.set("token", token, { path: "/", httpOnly: true });
    response.cookies.set("name", user.name, { path: "/" });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
