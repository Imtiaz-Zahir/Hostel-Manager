import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/database/connect";
import Notice from "@/models/notice";

export async function GET() {
  try {
    await connectToDB();
    const notice = await Notice.find().sort({ createdAt: -1 });
    if (!notice || notice.length == 0) {
      return NextResponse.json({
        status: "0",
        message: "No data found",
      });
    }

    return NextResponse.json({
      status: "1",
      message: "Data Available",
      data: notice,
    });
  } catch (error) {
    return NextResponse.json({ status: "0", message: "Something went wrong" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const critical = formData.get("critical");
    const description = formData.get("descrip");

    if (!critical || !description) {
      return NextResponse.json({
        status: "0",
        message: "Phone and password are required",
      });
    }

    await connectToDB();

    const notice = await Notice.findOne()
      .sort({ uid: -1 })
      .limit(1)
      .select("uid");

    const newUid = notice ? parseInt(notice.uid) + 1 : 1;

    const newnotice = await Notice.create({
      uid: newUid.toString(),
      critical: critical,
      descrip: description,
    });

    if (!newnotice) {
      return NextResponse.json({
        status: "0",
        message: "Data not inserted",
      });
    }

    return NextResponse.json({
      status: "1",
      message: "Data Successfully Inserted",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "0", message: "Something went wrong" });
  }
}
