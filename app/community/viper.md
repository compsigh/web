---
title: "compsigh DEPLOY/23 project: Viper"
description: "Looking back at my first ever hackathon W"
authors: [
  { name: "Andrew", avatar: "/avatars/andrew.png" },
]
og_image: "/og/viper.png"
---

Viper is a Discord bot for referencing info from past conversations. It proactively chimes in when you ask a question that's already been answered, when you're looking for info on a topic that's been discussed, or just need to recall that one thing a friend said last week.

<Media
  src="/og/viper.png"
  alt="viper logo"
/>

## Inspiration

Viper was conceived by me and my friends Jake, Yiyu, and Tao, at DEPLOY/23, compsigh's Fall 2023 hackathon.

With AI still being all the rage, we knew many hackathon projects would be wrappers of ChatGPT in some way or another. When brainstorming an idea for the event, we were excited about a real-world product integration that could be enhanced by large language models. Early concepts included a Q&A app, integrated with Canvas and Campuswire, a class discussion board software used in many USF CS courses.

We chose a Discord bot, which was ideal because:

- We're all fans of Discord and are familiar with its interface (and how Discord bots work)
- It's more feasible and convenient to develop in a hackathon setting, since the frontend *is* Discord
- It met our criteria of integrating LLMs in a way that would be familiar to people, while still presenting new use cases

<Media
  src="/community/viper/discord.gif"
  alt="An illustration of the Discord loading animation"
/>

While many Discord bots enhance servers by playing music or helping admins moderate chat, none offer the capability to read entire conversations and store messages for future reference. That's where we saw the perfect opportunity: to build a Discord bot that reads messages in a channel, and use an LLM to identify future questions that previous answers might relate to.

## Dev Day

That Saturday felt like one of the longest and most grueling days of my life. This wasn't my first hackathon, so I knew how crucial it was to stay focused and dedicated throughout the day. Jake, Yiyu, and I spent the entire morning and afternoon hunkered down in an empty room at Gleeson Library.

Unfortunately, Tao came down with COVID, so it was just the three of us on campus for the hackathon, while Tao participated remotely. Despite being at home, Tao was instrumental in our progress and provided invaluable help whenever we hit a roadblock.

<Media
  description="To make or break — that is the question."
  src="/community/viper/gleeson.png"
  alt="A front view of the Gleeson Library"
/>

We brainstormed design ideas, did some whiteboarding, and quickly started incremental development. The process went more smoothly than I anticipated, and I believe that early testing success played a crucial role in helping us complete the bot in time.

As twilight approached, we ordered some Super Duper Burger and wrapped up our day in Kalmanovitz Hall. We faced several challenges along the way, but our team's support for one another helped us overcome them.

Just before heading home, I whipped up the [landing page for Viper](https://viper-deploy2023.github.io) in about an hour, marking my first experience with GitHub Pages. I was relieved to find that it was simple to work with, thanks to Markdown.

## Demo

Our tech stack of choice:

- [Python 3](https://www.python.org): The primary programming language powering the project.
- [Discord API](https://discord.com/developers/docs/intro): Enables integration with Discord for bot functionalities.
- [Yake](https://liaad.github.io/yake): Used for keyword extraction.

We aimed to keep things as simple as possible, prioritizing the core problems we needed to solve: keyword extraction and question detection without getting too caught up with scalability. Think of it as a mini search engine, but instead of scraping web pages, it's diving into Discord messages.

For example, Viper can detect when a user asks a question in a channel. It then digs through the channel's past messages to find common answers that might address the user's query.

This approach has a key advantage over ChatGPT wrappers: it delivers specific, direct answers based on the content already within the Discord server itself — information that isn't available on the web.

<Media src="/community/viper/demo.mp4" />

## Presentation Day

Right before our presentation on Sunday, we chose the ultimate walk-on song: the [SpongeBob OST](https://www.youtube.com/watch?v=4A2ygNnUMGY). I still remember the audience laughing heartily as we took the stage. Our presentation went well, and to our delight, we snagged 2nd place!

Looking back, I think we won because we all pushed ourselves to the fullest, embraced the joy of learning something new, and, most importantly, let each other cook in our own ways.

<Grid columns={2}>
  That night, the whole squad rolled out for an epic celebration — dinner at a bomb Thai restaurant followed by some ice cream. Come to think of it, I learned more in those two days than I ever have in any other two-day stretch this semester. All the struggles, bug fixes, mentoring, being mentored, and successful compiles — I loved every second of it. That day and night was truly a massive W for the club and definitely my favorite compsigh event so far. It's a day I will not forget.
  <Media
    src="/community/viper/dinner.png"
    style={{
      marginTop: 'unset'
    }}
  />
</Grid>

## Moving Forward

I'm thrilled that we had the core features of the bot up and running by the presentation. There's room for improvement, with more to be done. I look forward to the opportunity to make Viper even better in the future.

In the meantime, you can explore Viper's [landing page](https://viper-deploy2023.github.io/), and check out the [source code](https://github.com/viper-Deploy2023/viper) on GitHub.
