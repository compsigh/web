---
title: "compsigh DEPLOY/23 project: viper"
description: "Looking back at my first ever hackathon W"
authors: [
  { name: "Andrew", avatar: "/avatars/andrew.png" },
]
og_image: "/og/viper.png"
---

viper is a Discord bot designed to reference answers from past conversations, streamlining user interactions and improving the overall chat experience.

<Media
  src="/og/viper.png"
  alt="viper logo"
/>

## Inspiration

viper was conceived at DEPLOY/23, the Fall 2023 hackathon hosted by [compsigh (the best club at USF)](https://compsigh.club/).

By then, it was clear that many hackathon projects were revolving around ChatGPT wrappers. We aimed to steer clear of that trend, but we still wanted to incorporate LLMs, given their power and efficiency in handling backend tasks, which was perfect for a time constrained project.

Just days before the hackathon kicked off, I set up a Discord call with my team at LS G12, right before my CS 272 (Software Development) class, to brainstorm project ideas. We tossed around concepts, including a Q&A app and potential integrations with Canvas (our class/grades dashboard) or Campuswire (the modern-day Piazza). However, these ideas seemed too large scale for a hackathon, especially given that two of our team members were participating in their first hackathon. Our experience level was already a bit limited.

I'm a big fan of Discord and had always wanted to build a Discord bot, so I proposed that we create a Q&A bot for Discord. This idea was ideal because it allowed us to focus solely on the backend, with Discord covering the frontend. It turned out to be a solid plan to DEPLOY.

<Media
  src="/assets/viper/discord.gif"
  alt="A gif of discord."
/>

While many Discord bots enhance servers by playing music, generating AI responses, or managing server admin tasks, none offered the capability to read entire conversations and store messages for future reference. That’s where we saw the perfect opportunity: to build a Discord bot that reads messages in a channel and uses an LLM to identify future questions that previous answers might relate to.

## Hackathon

Our team consisted of Jake, Tao, Yiyu, and myself (Andrew). Unfortunately, Tao came down with COVID, so it was just the three of us on campus for the hackathon, while Tao participated remotely. Despite being at home, Tao was instrumental in our progress and provided invaluable help whenever we hit a roadblock.

### Day One

That Saturday felt like one of the longest and most grueling days of my life. This wasn’t my first hackathon, so I knew how crucial it was to stay focused and dedicated throughout the day. Jake, Yiyu, and I spent the entire morning and afternoon hunkered down in an empty room at the [Gleeson Library](https://library.usfca.edu/home).

<Media
  description="To make or break -- that is the question."
  src="/assets/viper/gleeson.png"
  alt="A front view of the Gleeson Library."
/>

We brainstormed design ideas, did some whiteboarding, and quickly started incremental development. The process went more smoothly than I anticipated, and I believe that early testing success played a crucial role in helping us complete the app in time.

As twilight approached, we ordered some [Super Duper Burger](https://www.superduperburgers.com/) and wrapped up our day at one of the workspaces in K-Hall. We faced several challenges along the way, but fortunately, our team’s support for one another helped us overcome them.

<Media
  description="yum yum"
  src="/assets/viper/superduper.png"
  alt="A tasty shot of a Super Duper Burger."
/>

Just before heading home, I whipped up the landing page for Viper in about an hour, marking my first experience with GitHub Pages. I was relieved to find that it was simple to work with, thanks to Markdown.
