import { flag } from "flags/next"
import { get } from "@vercel/edge-config"

export const showMarquee = flag({
  key: "show-marquee",
  description: "Display the /workingon marquee on the Community page",
  defaultValue: false,
  decide: async function () {
    return (await get(this.key)) as boolean
  }
})
