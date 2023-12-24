import { connectToDB } from "@/database/connect";
import Student from "@/models/student";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await connectToDB();
        const students=await Student.find().select(["uid","name","roll","registration","phone","father","fatherphone","mother","dist","upzila","session","room_no","student_id","is_admin","is_verified"])
        return NextResponse.json({
            status:"1",
            message:"Data found",
            data:students
        })
    } catch (error) {
        return NextResponse.json({
            status:"0",
            message:"Something went wrong"
        })
    }
}