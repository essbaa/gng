import { getBggThing } from "bgg-xml-api-client";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { bgId: number } }
) {
  try {
    const { bgId } = params;
    if (!bgId) {
      return new NextResponse("Id is requried!", { status: 400 });
    }

    const bg = await getBggThing({ id: bgId });

    return NextResponse.json(bg.item);
  } catch (error) {
    console.log("BGG_GET_THING_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
