import { connectToDB } from "@/database/connect";
import Student from "@/models/student";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const students = await Student.find({ uid: params.id }).select("-password");
    if (!students) {
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
    console.log(error);
    return NextResponse.json({
      status: "0",
      message: "Something went wrong",
    });
  }
}
