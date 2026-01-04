import { get } from "@vercel/edge-config"
import { redirect } from "next/navigation"

export default async function Invite() {
  const invite = await get("invite")
  if (!invite || invite.toString() === "") redirect("/")
  redirect(invite.toString())
}
