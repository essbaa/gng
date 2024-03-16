import { getBggSearch } from "bgg-xml-api-client";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { bgName: string } }
) {
  try {
    const { bgName } = params;
    if (!bgName) {
      return new NextResponse("Name is requried!", { status: 400 });
    }

    const bg = await getBggSearch({
      query: bgName,
      type: "boardgame",
    });

    // Initialize an empty array
    let itemsArray: any[] = [];

    // Check if bg.item is not null or undefined
    if (bg.item !== null && bg.item !== undefined) {
      // If bg.item is an array, filter out null values, else create an array with the item
      itemsArray = Array.isArray(bg.item)
        ? bg.item.filter((item) => item !== null)
        : [bg.item];
    }

    if (itemsArray.length === 0) {
      return new NextResponse("No Result found", { status: 500 });
    }

    return NextResponse.json(itemsArray);
  } catch (error) {
    console.log("BGG_GET_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
