import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/database/connect";
import Student from "@/models/student";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const roll = formData.get("roll");
    const registration = formData.get("registration");
    const phone = formData.get("phone");
    const father = formData.get("father");
    const fatherphone = formData.get("fatherphone");
    const mother = formData.get("mother");
    const dist = formData.get("dist");
    const upzila = formData.get("upzila");
    const session = formData.get("session");
    const password = formData.get("password");

    if (
      !name ||
      !roll ||
      !registration ||
      !phone ||
      !father ||
      !fatherphone ||
      !mother ||
      !dist ||
      !upzila ||
      !session ||
      !password
    ) {
      console.log(formData);
      
      return NextResponse.json({
        status: "0",
        message: "All fields are required",
      });
    }
    await connectToDB();

    const student = await Student.findOne()
      .sort({ uid: -1 })
      .limit(1)
      .select("uid");

    const newUid = student?parseInt(student.uid) + 1 :1;

    const newStudent = await Student.create({
      uid: newUid.toString(),
      name: name,
      roll: roll,
      registration: registration,
      phone: phone,
      father: father,
      fatherphone: fatherphone,
      mother: mother,
      dist: dist,
      upzila: upzila,
      session: session,
      password: password,
    });
    if (!newStudent) {
      console.log("!newStudent");
      
      return NextResponse.json({
        status: "0",
        message: "Something went wrong",
      });
    }
    return NextResponse.json({
      status: "1",
      message: "Registration successful",
    });
  } catch (error) {
    console.log("error", error);
    
    return NextResponse.json({ status: "0", message: "Something went wrong" });
  }
}
