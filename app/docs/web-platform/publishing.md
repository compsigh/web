---
title: "Publishing on the compsigh web platform"
description: "Guidelines & tips on getting your work out there and shared by the club"
authors: [{ name: "Edward", avatar: "/avatars/edward.png" }]
---

post WIP, todos:

- minimize yap sesh
- include components documentation
- provide concrete steps for cloning, editing, writing, and publishing (opening PR) workflow

---

## Why the web platform?

one of the timeless struggles we face as CS majors is *getting our projects out there.* sharing our work is one of the best ways to increase discoverability, hirability, and serendipity for new opportunities.

when starting from scratch, it can seem pretty daunting: we need to think about not just the material, but the formatting, styling, and *where to publish the damn thing!*

so, with the **community** tab here on the web platform, we're looking to make compsigh the best place for us to *just write about our work.* here's how:

- 🔑 **we own it:** by having a local copy of the repo, we actually own what we write. no scammy vendor lock-in where platforms make it unnecessarily hard to export our content
- 💅 **styles built in:** we want to write words, not CSS. watch a text file turn into a well-formatted, clean page
- 🌐 **discoverability win-win:** as of July 2024 *(before the web platform is even live!)*, the club has three links on the first page of a "compsigh" Google search. the more content we put out → better discoverability for all of us → better discoverability *for you and your work!*

## Get started

the [web platform is open source](https://github.com/compsigh/web), and all contributions take place on our repo! get started by forking & cloning a local copy, and opening it up in your editor of choice.

if you've never used React, Next.js, or Node.js before, no worries; you won't need to know any of those for writing content. just run `npm install`, then `npm run dev` to preview your changes locally.

now, let's take a look at how to write & publish material on the platform.

## Anatomy of a post

every post in the community tab is written in Markdown, the same text formatting language GitHub, Discord, and many other platforms use. it allows for simple, inline formatting of text:

```plaintext showLineNumbers
hi!

in a Markdown file, we can *italicize text* by putting one asterisk around it, or **bold text** by putting two asterisks around it.

we can also make lists:
- item 1
- item 2
- item 3

plus embedding images, headings, and several other features you'd see on a rich text page :)
```

<Playground>
  <div
    style={{
      alignSelf: 'flex-start',
      padding: '8px 32px'
    }}
  >
hi!

in a Markdown file, we can *italicize text* by putting one asterisk around it, or **bold text** by putting two asterisks around it.

we can also make lists:

- item 1
- item 2
- item 3

plus embedding images, headings, and several other features you'd see on a rich text page :)
  </div>
</Playground>

you can read the [Markdown guide](https://markdownguide.org) for more info on syntax and why it's a great, platform-independent language of choice.

## Frontmatter

there's one component of Markdown that's important for writing on the web platform specifically: *frontmatter*. frontmatter is metadata — a series of key-value pairs — placed at the top of the page. each property can be represented by various data types.

```plaintext showLineNumbers {1-5}#add
---
title: "What can we do in a Markdown file?"
published: true
date: 2024-07-27
---

hi!

in a Markdown file, we can...
```

for the compsigh web platform, there are specific frontmatter properties that impact how your content is presented. let's take a look:

<Spacer size={16} />

### `title`

`string`

<p style={{color: 'red' }}>(required)</p>

this will show up as the title at the top of the page, as well as in the community tab, in search engines, and when you share a link to your post with a friend.

<Spacer size={16} />

### `description`

`string`

<p style={{color: 'red' }}>(required)</p>

this doesn't show up by default anywhere on the page itself, but like the `title`, is used in the community tab, search engines, and elsewhere when shared.

<Spacer size={16} />

### `authors`

`{ name: string, avatar: string }[]`

<p style={{color: 'red' }}>(required)</p>

this shows up at the top of the page, as well as in the community tab.

- `name` can be whatever you want — *most put their Discord username to keep with the theme :)*
- `avatar` represents a filepath relative to the `public/` directory to the image displayed next to your name

an example:

```plaintext showLineNumbers {4-7}
---
title: "compsigh team project: Cue"
description: "A minimalist active recall study app focused on helping students ask the right questions. Transform your notes into actionable study cards for easy pasting back into Google Docs or Notion, or export to Anki."
authors: [
  { name: "Edward", avatar: "/avatars/edward.png" },
  { name: "Sanju", avatar: "/avatars/sanju.jpeg" }
]
og_image: "/og/cue.png"
---
```

<Spacer size={16} />

### `og_image`

`string`

<p style={{ color: 'var(--color-light-50)' }}>(optional)</p>

"og" stands for opengraph, a standard for metadata across the Web. the `og_image` is a filepath relative to the `public/` directory to an image that'll be used whenever you share a link to your post (like the image you see on a Discord embed).

keep in mind, if you do upload one (encouraged!), please ensure it is `1200 × 630` pixels, as this is the standard and ensures it looks good on all platforms (LinkedIn, Discord, Slack, Twitter, etc.).

if you don't include one, the web platform will generate one for you :)

<Spacer size={16} />

### `decorations`

`boolean`

<p style={{ color: 'var(--color-light-50)' }}>(optional)</p>

if you have a display 1420px or wider, you'll see the decorations strewn across the margins of the page. as fun as they are, I totally get it if you'd want to hide them, especially when sending to a potential employer. you can do so by writing `decorations: false` (it's set to `true` by default, so you don't have to specify it if you're cool with them staying).

<Spacer size={16} />

### `previous` / `next`

`{ text: string, link: string }`

<p style={{ color: 'var(--color-light-50)' }}>(optional)</p>

if you're writing a series of posts (for example, clone workshop notes), this is a great way to link them together. it will display a link for each at the bottom of the page. an example from [compsigh leadership](/docs/leadership/about):

```plaintext showLineNumbers {5,6}
---
title: "compsigh leadership"
description: "The mission & methods of club leadership"
authors: []
previous: { text: "compsigh values", link: "/docs/values" }
next: { text: "Joining leadership", link: "/docs/leadership/joining" }
---
```

<Playground>
  <div style={{ alignSelf: 'flex-start' }}>
    <LinkBar
      type="previous"
      href="/docs/values"
    >
      compsigh values
    </LinkBar>
  </div>
  <div style={{ alignSelf: 'flex-end' }}>
    <LinkBar
      type="next"
      href="/docs/leadership/joining"
    >
      Joining leadership
    </LinkBar>
  </div>
</Playground>

<Spacer size={32} />

### `slug`

`string`

<p style={{ color: 'var(--color-light-50)' }}>(optional)</p>

by default, the web platform uses **filesystem-based routing:** the location of your file on the repo directly maps to where it's accessible online. e.g. `app/docs/leadership/about.md` → `compsigh.club/docs/leadership/about`.

if you want to bind your post to a route other than where your file is located, you can use `slug`, relative to the root route (`compsigh.club`).

<Note>
**note:** please be mindful of how you use `slug`!

a solid use case might be where you have an ordered list of posts for your compsigh clone workshop, structured like this:

- `/events/my-workshop/01-getting-started.md`
- `/events/my-workshop/02-installing.md`
- `/events/my-workshop/03-building.md`

if the numbers help you stay organized in the repo, but you don't want them to show up in the URL, you can use `slug` to remove them:

```plaintext showLineNumbers
---
title: "My workshop: Getting started"
slug: "/events/my-workshop/getting-started"
---
```

an improper use of `slug` would be to, for example, reroute your team project page to under the root route, from `compsigh.club/community/cue` to `compsigh.club/cue`. let's be fair :)
</Note>

## Encouragements & asks

things that are encouraged:

- **hack around & experiment:** you just cloned the whole codebase! have an idea for a cool React component? ship it yo 😎
- **modify styles:** as partial as I am to the ones we have lol, it's totally ok for you to change as much or as little as you want. here's an example:

<Grid columns={2}>
  <div>
    ```tsx showLineNumbers
    <div style={{
      color: 'deeppink'
    }}>
edward ipsum iteration velocity next.js have you heard of arc warp vercel compsigh push to prod cue 221 webdev deploy cyka raycast cascade :3

faadil ipsum fortnite general relativity obsidian petemob twitter dudududududude sanju skill issue yoooooooo "x" furry brain rot math tea
    </div>
    ```

e.g. wrapping your entire post in a `<div>` with a set `color`
  </div>
  <Playground>
    <div style={{
      color: 'deeppink',
      padding: '0 8px'
    }}>
edward ipsum iteration velocity :p next.js have you heard of arc warp vercel compsigh push to prod cue 221 webdev deploy cyka raycast cascade :3

faadil ipsum fortnite general relativity obsidian petemob twitter dudududududude meowww skill issue raytracer furry brain rot fear & hunger math tea
    </div>
  </Playground>
</Grid>

things that will probably get your post flagged:

- **embedding third-party content:** e.g. instead of loading an image from a URL, it's preferred you upload it to the `public/assets/` directory. "third-party content" especially includes scripts or `<iframe>`s, but I promise it'll be case-by-case. for example, your data vis project might use Tableau. totally valid! but some sketchy CDN prolly isn't 😭
- **irrelevant, defamatory, or generally uncool content:** compsigh is pro-free speech — we have very minimal content policies, and as a club we think it's important to stoke thought-provoking discussion. in most cases, content will get greenlit. but there's a time & place for everything :p
