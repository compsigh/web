import prisma from '@/functions/db'
import { MarqueeEntry } from '@prisma/client'

export async function getMarqueeEntry(id: string) {
  return await prisma.marqueeEntry.findUnique({
    where: { id }
  })
}

export async function getAllMarqueeEntries() {
  return await prisma.marqueeEntry.findMany()
}

export async function newMarqueeEntry(marquee: MarqueeEntry) {
  return await prisma.marqueeEntry.create({
    data: marquee
  })
}

export async function updateMarqueeEntry(marquee: MarqueeEntry) {
  return await prisma.marqueeEntry.update({
    where: { id: marquee.id },
    data: marquee
  })
}

export async function deleteMarqueeEntries(id: string) {
  const result = await prisma.marqueeEntry.deleteMany({
    where: { id }
  })
  return result.count
}
