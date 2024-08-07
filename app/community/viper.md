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

