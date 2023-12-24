import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/database/connect";
import Student from "@/models/student";
import md5 from "md5";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const phone = formData.get("phone");
    const password = formData.get("password");

    if (!phone || !password) {
      return NextResponse.json({
        status: "0",
        message: "Phone and password are required",
      });
    }

    await connectToDB();
    const userData = await Student.findOne({
      phone: phone,
      password: password,
    }).select([
      "uid",
      "name",
      "roll",
      "registration",
      "phone",
      "is_admin",
      "is_verified",
    ]);
    if (!userData) {
      return NextResponse.json({
        status: "0",
        message: "Phone or password is wrong",
      });
    }
    
    return NextResponse.json({
      status: "1",
      message: "Login successful",
      auth_token: md5(userData.uid),
      data: userData,
    });
  } catch (error) {
    return NextResponse.json({ status: "0", message: "Something went wrong" });
  }
}
