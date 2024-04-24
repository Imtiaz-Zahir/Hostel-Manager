import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "1",
    message: "Data Available",
    data: [
      {
        id: "1",
        hall_supar_name: "মোঃ সাব্বির হোসেন",
        hall_supar_phone: "০১৬৮৬০৩৫৬৪১\r\n",
        position: "Hostel Super",
        image:
          "https://apiholder.000webhostapp.com/hostel/images/hostelsupar.png",
      },
      {
        id: "2",
        hall_supar_name: "মোহসীন",
        hall_supar_phone: "০১৯২০৬৪৯১৫৬",
        position: "Assistant Hostel Super",
        image: "https://apiholder.000webhostapp.com/hostel/images/mohosin.png",
      },
      {
        id: "3",
        hall_supar_name: "মোঃ মানিক মিয়া",
        hall_supar_phone: "০১৭২৭১৭০৯৫৯",
        position: "Office Assistant",
        image:
          "https://apiholder.000webhostapp.com/hostel/images/manikmian.jpg",
      },
    ],
  });
}
