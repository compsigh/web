---
title: "compsigh DEPLOY/23 project: Viper"
description: "Looking back at my first ever hackathon W"
authors: [
  { name: "Andrew", avatar: "/avatars/andrew.png" },
]
og_image: "/og/viper.png"
---

Viper is a Discord bot for referencing answers from past conversations. It proactively chimes in when you ask a question that's already been answered, when you're looking for info on a topic that's been discussed, or just need to recall that one thing a friend said last week.

<Media
  src="/og/viper.png"
  alt="viper logo"
/>

## Inspiration

Viper was conceived by me and my friends Jake, Yiyu, and Tao, at DEPLOY/23, compsigh's Fall 2023 hackathon.

With AI still being all the rage, we knew many hackathon projects would be wrappers of ChatGPT in some way or another. When brainstorming an idea for the event, we were excited about a real-world product integration that could be enhanced by large language models. Early concepts included a Q&A app and integrations with the university Canvas LMS or Campuswire, a class discussion board software used in many USF CS courses.

We chose a Discord bot, which was ideal because:

- We're all fans of Discord and are familiar with its interface (and how Discord bots work)
- It's more feasible and convenient to develop in a hackathon setting, since the frontend *is* Discord
- It met our criteria of integrating LLMs in a way that would be familiar to people, while still presenting new use cases

<Media
  src="/assets/viper/discord.gif"
  alt="An illustration of the Discord loading animation"
/>

While many Discord bots enhance servers by playing music or helping admins moderate chat, none offered the capability to read entire conversations and store messages for future reference. That's where we saw the perfect opportunity: to build a Discord bot that reads messages in a channel, and use an LLM to identify future questions that previous answers might relate to.

## Hackathon

Unfortunately, Tao came down with COVID, so it was just the three of us on campus for the hackathon, while Tao participated remotely. Despite being at home, Tao was instrumental in our progress and provided invaluable help whenever we hit a roadblock.

### Dev Day

That Saturday felt like one of the longest and most grueling days of my life. This wasn't my first hackathon, so I knew how crucial it was to stay focused and dedicated throughout the day. Jake, Yiyu, and I spent the entire morning and afternoon hunkered down in an empty room at Gleeson Library.

<Media
  description="To make or break -- that is the question."
  src="/assets/viper/gleeson.png"
  alt="A front view of the Gleeson Library."
/>

We brainstormed design ideas, did some whiteboarding, and quickly started incremental development. The process went more smoothly than I anticipated, and I believe that early testing success played a crucial role in helping us complete the bot in time.

As twilight approached, we ordered some Super Duper Burger and wrapped up our day in Kalmanovitz Hall. We faced several challenges along the way, but our team's support for one another helped us overcome them.

Just before heading home, I whipped up the [landing page for Viper](https://viper-deploy2023.github.io) in about an hour, marking my first experience with GitHub Pages. I was relieved to find that it was simple to work with, thanks to Markdown.

### Presentation Day

<Grid columns={2} columnSizeDistribution={["1fr", "1fr"]}>
  <Media
    src="/assets/viper/spongebob.png"
    style={{
      marginTop: 'unset'
    }}
  />
  <div>
    <p>Right before our presentation on Sunday, we settled on the ultimate walk-on song: <a href="https://www.youtube.com/watch?v=4A2ygNnUMGY" target="_blank">a SpongeBob OST</a>. I still remember the audience laughing heartily as we took the stage. Our presentation went surprisingly well, and to our delight, we miraculously snagged 2nd place!</p>
  </div>
</Grid>

Looking back, I think we won because we all pushed ourselves to the fullest, embraced the joy of learning something new, and, most importantly, let each other cook in our own ways.

<Grid columns={2} columnSizeDistribution={["1fr", "1fr"]}>
  <div>
    <p>That night, the whole squad rolled out for an epic celebration—dinner at a bomb Thai restaurant followed by some ice cream. Come to think of it, I learned more in those two days than I ever have in any other two-day stretch this semester. All the struggles, bug fixes, mentoring, being mentored, and successful compiles—I loved every second of it. That day and night was truly a massive W for the club and definitely my favorite compsigh event so far. It's a day I will not forget.</p>
  </div>
  <Media
    src="/assets/viper/dinner.png"
    style={{
      marginTop: 'unset'
    }}
  />
</Grid>

## Features

Before diving into the features, let’s first review the tech stack:

- [Python 3](https://www.python.org/downloads/): The primary programming language powering the project.
- [Discord API](https://discord.com/developers/docs/intro): Enables integration with Discord for bot functionalities.
- [Yake](https://liaad.github.io/yake/): Used for keyword extraction.

We aimed to keep things as simple as possible, prioritizing the core problems we need to solve: keyword extraction and question detection without getting too caught up with scalability.

### Screenshots

Our Discord bot is designed to detect when a user asks a question in a server channel. It then digs through the channel's past messages to find common answers that might address the user’s query. Think of it as a mini search engine, but instead of scraping web pages, it’s diving into Discord messages.

This approach has a key advantage over ChatGPT wrappers: it delivers specific, direct answers based on the content already within the Discord server itself—information that isn’t available on the web.

A picture is worth a thousand words, so check out the visuals below to see a demo:

<Grid columns={2} columnSizeDistribution={["1fr", "1fr"]}>
  <Media
    src="/assets/viper/demo1.png"
    style={{
      marginTop: 'unset'
    }}
  />
  <Media
    src="/assets/viper/demo2.png"
    style={{
      marginTop: 'unset'
    }}
  />
</Grid>

### Moving Forward

I’m thrilled that we had the core features of the app up and running by the presentation, but there's still room for improvement. There’s definitely more to be done, and I hope to have the opportunity to refine it further in the future.

In the meantime, you can explore Viper's [landing page](https://viper-deploy2023.github.io/), and check out the [source code](https://github.com/viper-Deploy2023/viper).