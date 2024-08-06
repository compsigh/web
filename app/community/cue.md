---
title: "compsigh team project: Cue"
description: "A minimalist active recall study app focused on helping students ask the right questions. Transform your notes into actionable study cards for easy pasting back into Google Docs or Notion, or export to Anki."
authors: [
  { name: "Edward", avatar: "/avatars/edward.png" },
  { name: "Sanju", avatar: "/avatars/sanju.jpeg" }
]
og_image: "/og/cue.png"
---

Cue is a minimalist active recall study app focused on helping students ask the right questions. Transform your notes into actionable study cards for easy pasting back into Google Docs or Notion, or export to Anki.

<Media
  src="/og/cue.png"
  alt="Cue wordmark banner"
/>

## Inspiration

Cue was born at Dons Hack 2023, the annual Spring hackathon hosted by our friends at ACM × WiT.

The timing for an AI-powered study app was just right:

- That semester, we were both taking note-heavy courses
- It was March–April 2023, and [OpenAI had just announced GPT-4](https://openai.com/research/gpt-4)
- The theme for the hackathon was ed-tech: build a solution that solves a problem in education

So, what's the problem we're solving? There are plenty of flashcard apps out there. The thing is, they assume you already know what to study. We thought to leverage what we know about active recall — one of the most efficient, science-backed study methods — to create a tool that **helps students ask the right questions**.

## Hackathon

We had a collective three months' worth of web dev experience, and had to learn a lot, fast. That's one of the great things about hackathons — win or lose, you'll likely walk away knowing a hell of a lot more than you did coming in.

We built Cue using:

- [React](https://react.dev) & [Next.js](https://nextjs.org)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- OpenAI API
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv)
- [NextAuth](https://github.com/nextauthjs/next-auth)
- [Sass](https://sass-lang.com)

<Mic name="Edward" avatar="/avatars/edward.png" />

Around this time, I was also getting into UI design, and I wanted to push myself to have Cue stand out from the crowd.

<Media
  title="Cue icon set"
  src="/assets/cue-icons.png"
/>

The vibes were great:

<Media
  title="compsigh teams at Dons Hack 2023"
  description="Even though we were all competing, we knew a win for any team from the club was a win for all of us. So, we worked together in one room and helped each other out."
  src="/assets/cue-donshack-compsigh-teams.JPG"
/>

<Media
  title="Edward's Saturday night desk setup"
  description="It was time to lock in"
  src="/assets/cue-donshack-latenight.JPG"
  alt="Edward's desk setup on Saturday night. Pictured is his dual-monitor setup (code on one, API docs and live preview on the other) and a cup of tea."
/>

Oh, and we won, too. :)

## Features

So, what does Cue actually do?

Its primary function is to take your study notes, and return the most relevant questions to quiz yourself on.

<Media
  title="Cue beta demo from May 2023, not long after the hackathon"
  video={true}
  src="/assets/cue-may2023-beta-demo.mp4"
/>

We're happy to say we continued working on Cue after Dons Hack, and shipped some pretty cool features.

### Invite system

<Media
  title="In-app invites"
  description={<>From day one, we made the app open to all USF students for free, but we wanted an invite system for our friends &amp; family elsewhere. Here we hooked up Typeform to an API that would generate an invite code like <code>gaius-julius-caesar</code>.</>}
  video={true}
  src="/assets/cue-invite-demo.mp4"
/>

<Grid columns={2} columnSizeDistribution={["1fr", "3fr"]}>
  <Media
    video={true}
    src="/assets/cue-invite-cards.mp4"
    style={{
      marginTop: 'unset'
    }}
  />
  <div>
    <p>We really liked the idea of invites, and we went all out, because why not?</p>
    <p>We produced a set of 50 <em>physical</em> invite cards, each with their own unique invite linked via QR code.</p>
    <p>Invites had conditions like <code>no-invite</code> (invited students can&apos;t also +1) to help us scale reasonably.</p>
    <p>We also gave these out at Destination USF.</p>
  </div>
</Grid>

### Waitlist

Edward [posted about Cue on X](https://x.com/edwardshturman/status/1662181707955486722) and we got a decent amount of students signing up for the beta. In August 2023, we sent out the invites.

<Media
  title="Waitlist invite email"
  video={true}
  src="/assets/cue-waitlist-email.mp4"
/>

Since then, we've put development on pause as we push through a heavy junior year in computer science. We hope to return shortly thereafter!

In the meantime, you can check out Cue's [landing page](https://cue.study), [documentation](https://docs.cue.study), and [source code](https://github.com/compsigh/cue).
