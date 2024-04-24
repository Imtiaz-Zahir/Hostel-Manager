import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/database/connect";
import Gallery from "@/models/gallery";

export async function GET() {
    try {
        await connectToDB();
        const images = await Gallery.find();
        if (!images || images.length == 0) {
          return NextResponse.json({
            status: "0",
            message: "No data found",
          });
        }
    
        return NextResponse.json({
          status: "1",
          message: "Data Available",
          data: images,
        });
      } catch (error) {
        return NextResponse.json({ status: "0", message: "Something went wrong" });
      }
}


export async function POST(req: NextRequest) {
    try {
      const formData = await req.formData();
      const image = formData.get("image_url");
  
      if (!image) {
        return NextResponse.json({
          status: "0",
          message: "image_url is required",
        });
      }
  
      await connectToDB();
  
      const imageData = await Gallery.findOne()
        .sort({ id: -1 })
        .limit(1)
        .select("id");
  
      const newid = imageData ? parseInt(imageData.id) + 1 : 1;
  
      const newimageData = await Gallery.create({
        id: newid.toString(),
        image_url: image,
      });
  
      if (!newimageData) {
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
  