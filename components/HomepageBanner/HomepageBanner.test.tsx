import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { HomepageBanner } from "./HomepageBanner"
import { EventFrontmatter } from "@/app/events/page"

describe("Next Component HomepageBanner", () => {
  it("Renders when an event is coming up", () => {
    const currentTime = Math.floor(new Date().getTime() / 1000)

    const testing_UpComingEvent: EventFrontmatter[] = [
      {
        title: "DAVE",
        description: "register!",
        event_details: {
          start: currentTime + 60,
          end: currentTime + 90,
          location: "The Hive",
          cover_image: "/events/2025-11-07/deploy25.png",
          pictures: [],
          link: "https://touch-grass.tech/"
        },
        slug: "events/2025-11-07/deploy25"
      }
    ]

    render(<HomepageBanner events={testing_UpComingEvent} />)

    const banner = screen.getByText((content) =>
      content.includes('"DAVE" is coming up.')
    )

    expect(banner).toBeInTheDocument()
  })
})
