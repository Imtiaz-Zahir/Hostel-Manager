import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/database/connect";
import Student from "@/models/student";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const id = formData.get("userId");
    const newStatus = formData.get("status");
    const newStudentId = formData.get("newStudentId");
    const newRoomNo = formData.get("newRoomNo");

    if (!id || !newStatus || !newStudentId || !newRoomNo) {
      return NextResponse.json({
        status: "0",
        message: "All fields are required",
      });
    }

    await connectToDB();

    const newUser = await Student.findOneAndUpdate(
      { uid: id },
      {
        is_verified: newStatus,
        student_id: newStudentId,
        room_no: newRoomNo,
      }
    );

    console.log(newUser);

    if (!newUser) {
      return NextResponse.json({
        status: "0",
        message: "user not found",
      });
    }

    return NextResponse.json({
      status: "1",
      message: "Status changed successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: "0",
      message: "Something went wrong",
    });
  }
}
