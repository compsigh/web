import prisma from "@/functions/db"
import { MarqueeEntry } from "@prisma/client"

export async function newMarqueeEntry(marquee: MarqueeEntry) {
  return await prisma.marqueeEntry.create({
    data: marquee,
  })
}
