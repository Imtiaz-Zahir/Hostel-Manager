import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/database/connect";
import Student from "@/models/student";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("userId");
    const newStatus = searchParams.get("status");
    const newStudentId = searchParams.get("newStudentId");
    const newRoomNo = searchParams.get("newRoomNo");

    if (!id || !newStatus || !newStudentId || !newRoomNo)
      return NextResponse.json({
        status: "0",
        message: "All fields are required",
      });

    await connectToDB();

    const newUser = await Student.findOneAndUpdate(
      { uid: id },
      {
        is_verified: newStatus,
        student_id: newStudentId,
        room_no: newRoomNo,
      }
    );

    if (!newUser)
      return NextResponse.json({
        status: "0",
        message: "Something went wrong",
      });

    return NextResponse.json({
      status: "1",
      message: "Status changed successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: "0",
      message: "Something went wrong",
    });
  }
}