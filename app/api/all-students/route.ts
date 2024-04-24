import { connectToDB } from "@/database/connect";
import Student from "@/models/student";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const students = await Student.find().select("-password");
    if (!students || students.length==0) {
      return NextResponse.json({
        status: "0",
        message: "No data found",
      });
    }
    return NextResponse.json({
      status: "1",
      message: "Data found",
      data: students,
    });
  } catch (error) {
    return NextResponse.json({
      status: "0",
      message: "Something went wrong",
    });
  }
}
