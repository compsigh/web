import { getEvents } from "@/app/events/page";
import { EventFrontmatter } from "@/app/events/page";

export async function HomepageBanner() {
  const events: EventFrontmatter[] = await getEvents();
  console.log(events);
  return <h1>HEllO</h1>;
}