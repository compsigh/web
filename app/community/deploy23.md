---
title: "DEPLOY/23: compsigh's first hackathon"
description: "We just wrapped up our first hackathon, and our biggest event of the Fall 2023 semester! Here's the story of DEPLOY/23: an entirely student-bootstrapped, three-day event, bringing together the best minds in CS, design, and engineering to hack on a project for a weekend."
post_date: 1700442000
authors: [
  { name: "Edward", avatar: "/avatars/edward.png" },
  { name: "Quinn", avatar: "/avatars/quinn.png" },
  { name: "Antoinette", avatar: "/avatars/antoinette.png" },
  { name: "Andrew", avatar: "/avatars/andrew.png" },
  { name: "Jet", avatar: "/avatars/jet.png" },
  { name: "Calvin", avatar: "/avatars/calvin.png" }
]
og_image: "/community/deploy23/og.png"
---

We just wrapped up our first hackathon, and our biggest event of the Fall 2023 semester! Here's the story of DEPLOY/23: an entirely student-bootstrapped, three-day event, bringing together the best minds in CS, design, and engineering to hack on a project for a weekend.

<Media src="/community/deploy23/intro.gif" />

## Vibes

Hackathons are epic, life-changing experiences.

Even though compsigh is one of the more chill clubs at USF, we really wanted to capture this nature of hackathons and do it justice.

*"It has to be be super high-quality...."*

*"Cyberpunk vibes!"*

*"What if we made an AI-generated trailer?"*

*"Let's build a custom platform for participants...."*

We think the result was really something special.

## Trailer

<Mic name="Andrew" avatar="/avatars/andrew.png" />

For a hackathon with a cyberpunk / dystopian future vibe, we felt it'd be appropriate and timely to make an event trailer using AI. ;)

I led a collaboration between compsigh and our friends at Game Design Club (shoutout to Jake, Dorian, Lauren, and Lillian), to write up some lore, and craft a storyboard.

<Media
  src="/community/deploy23/storyboard.jpeg"
  alt="A picture of the DEPLOY/23 trailer storyboard, drawn out on a whiteboard"
/>

We drew inspiration from games, aesthetics, and stories we'd all grown up with. Those included:

- [VALORANT Protocol 781-A trailer](https://youtube.com/watch?v=h6i8lM3egvI)
- [Revenant from Apex Legends](https://youtube.com/watch?v=75szF5i41Bw)
- Orwellian dystopia stories
- [Ghost in the Shell](https://en.wikipedia.org/wiki/Ghost_in_the_Shell_(1995_film))
- [Winter Soldier](https://youtube.com/watch?v=2bWWBjKEiZA)
- [Watch Dogs 2](https://ubisoft.com/en-us/game/watch-dogs/watch-dogs-2)
- Cybernetics
- [The Matrix](https://en.wikipedia.org/wiki/The_Matrix)
- [Rust](https://rust.facepunch.com)
  - Thanks to OST artist [Alex Rehberg](https://alexrehberg.com) for the track Wastes, used in the trailer

<Mic name="Edward" avatar="/avatars/edward.png" />

From the team's great ideas, I set up a production workflow using [Midjourney](https://midjourney.com) to create each scene as a static image, using [Runway](https://runwayml.com) to animate it, and upscaling using [Topaz Labs](https://topazlabs.com).

If you haven't seen it yet, [watch the DEPLOY/23 trailer](https://youtube.com/watch?v=EepB7ZA1zNw) on YouTube!

## Platform

If we're going to up the quality, Devpost and Google Forms won't cut it. We set out to design-engineer a custom platform for participant registration, team formation, and project submission. We also needed it to accommodate our logistics and workflow for the event, which was in Notion.

Here's the result, written in React & Next.js, auth via NextAuth, forms via Tally, and logistics via Notion API:

<Media src="/community/deploy23/platform.mp4" />

<Media
  src="/community/deploy23/platform-console.png"
  alt="A screenshot of the DEPLOY/23 Console, where participants can register, form their teams, and submit their projects"
/>

<Media
  src="/community/deploy23/platform-submission.png"
  alt="A screenshot of the DEPLOY/23 project submission form"
/>

You can [read the technical breakdown](https://github.com/compsigh/deploy) on our GitHub repo.

## Mistakes we made

### Timing

Putting on a Fall hackathon, we can take advantage of early academic-year excitement, but it does put us in a tough spot: between Halloween, Thanksgiving, Fall Break, finals, and giving enough advance notice for mental prep and planning, *timing is hard*.

We fumbled by choosing Halloweekend, and then the weekend leading up to Thanksgiving break. This is definitely something we'll choose wisely next year!

### JavaScript

Without getting too technical, due to the time pressure, when creating the platform we opted for a faster development workflow, sacrificing type safety. This was...the wrong choice, lol. We actually shipped two production bugs to the platform, and shoutout to Cal for catching them! Ever since, every platform the club makes is TypeScript-first.

### Too serious?

"Intense" was an adjective thrown around when we asked how DEPLOY/23 should be described, lol. However, one piece of feedback we heard was that, especially for freshmen, it was intimidating. And this totally makes sense — *"I've just barely done 110; this looks too professional for me."*

For next year, we're looking into ways to ease the perceived difficulty, including:

- Separate criteria based on graduating class
- Several project-based events leading up to the weekend for practice
- A "mock hackathon" for lowering the stakes and getting familiar with the format

<Spacer size={32} />

What a weekend. It was exhilerating putting this event on, and we hope it was for everyone who attended. We're all looking forward to DEPLOY/24. See you next Fall! :)

<Media
  src="/community/deploy23/presenters.jpeg"
  alt="A picture of the DEPLOY/23 presenters on stage"
/>
