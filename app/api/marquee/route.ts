import {
  getMarqueeEntry,
  newMarqueeEntry,
  updateMarqueeEntry,
  deleteMarqueeEntry
} from '@/functions/db/marquee'

export async function POST(request: Request) {
  const body = await request.json()
  const marquee = await getMarqueeEntry(body.id)

  // Not idiomatic HTTP, but we'll live with it for now
  if (marquee)
    await updateMarqueeEntry(body)
  else
    await newMarqueeEntry(body)

  return Response.json({ body })
}

export async function DELETE(request: Request) {
  const body = await request.json()
  const numDeleted = await deleteMarqueeEntry(body.id);

  return Response.json({ numDeleted });
}
