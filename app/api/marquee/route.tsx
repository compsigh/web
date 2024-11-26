import { newMarqueeEntry } from "@/functions/db/marquee"

export async function POST(request: Request) {
  const body = await request.json()
  await newMarqueeEntry(body)
  return Response.json({ body })
}
