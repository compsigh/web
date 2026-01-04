import { get } from "@vercel/edge-config"
import { redirect } from "next/navigation"

export default async function Spotify() {
  const spotify = await get("spotify")
  if (!spotify || spotify.toString() === "") redirect("/")
  redirect(spotify.toString())
}
