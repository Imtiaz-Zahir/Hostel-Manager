import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/database/connect";
import Meal from "@/models/meal";

export async function GET() {
  try {
    await connectToDB();
    const meals = await Meal.find().sort({ createdAt: -1 });
    if (!meals || meals.length == 0) {
      return NextResponse.json({
        status: "0",
        message: "No data found",
      });
    }

    return NextResponse.json({
      status: "1",
      message: "Data Available",
      data: meals,
    });
  } catch (error) {
    return NextResponse.json({ status: "0", message: "Something went wrong" });
  }
}
