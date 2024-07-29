---
title: "How to publish on the compsigh web platform"
description: "Guidelines & tips on getting your work out there and shared by the club"
authors: [{ name: "Edward", avatar: "/avatars/edward.png" }]
previous: { text: "Why share your work on the compsigh web platform", link: "/docs/web-platform/why-publish" }
---

## Getting set up

the [web platform is open source](https://github.com/compsigh/web), and all contributions take place on our repo! if you've never used React, Next.js, or Node.js before, no worries; you won't need to know any of those for writing content. get started by forking & cloning a local copy, and opening it up in your editor of choice.

<Note>
I personally edit all notes directly in VS Code with [my minimalist setup](https://edward.so/notes/vs-code). there are tons of helpful extensions to build on top of this, even Grammarly!
</Note>

next, run `npm install` to install dependencies.

finally, run `npm run dev` to run the dev server and preview your changes locally (hit `^C` to stop it). I would have this up while you're writing just to get the vibes of how it looks on the page early on.

## Markdown primer

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

there's one component of Markdown that's important for writing on the web platform specifically: *frontmatter*. frontmatter is metadata — a series of key-value pairs — placed at the top of the page. each property can be represented by one of several data types.

```plaintext showLineNumbers {1-5}#add
---
title: "What can we do in a Markdown file?"
published: true
date: 2024-07-27
---

hi!

in a Markdown file, we can...
```

for the compsigh web platform, there are specific frontmatter properties that impact how content is presented. let's take a look:

<Spacer size={16} />

### `title`

`string`

<p style={{color: 'red' }}>(required)</p>

this will show up at the top of the page, in the community tab, in search engines, and when you share a link to your post.

<Spacer size={16} />

### `description`

`string`

<p style={{color: 'red' }}>(required)</p>

this doesn't show up on the page itself, but like `title`, is used in the community tab, search engines, and elsewhere when shared.

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

"og" stands for opengraph, a standard for metadata across the Web. the `og_image` is a filepath relative to the `public/` directory to an image that'll be used when you share a link to your post (like the image on a Discord embed).

if you do upload one *(encouraged!)*, please ensure it is `1200 × 630` pixels, as this is the standard and ensures it looks good on all platforms (LinkedIn, Discord, Slack, Twitter, etc.).

if you don't include one, the web platform will generate one for you :)

<Spacer size={16} />

### `decorations`

`boolean`

<p style={{ color: 'var(--color-light-50)' }}>(optional)</p>

if you have a display 1420px or wider, you'll see the decorations strewn across the margins of the page. as fun as they are, I totally get it if you want to hide them, especially when sending to a potential employer. you can do so by writing `decorations: false` (it's set to `true` by default, so you don't have to specify it if you're cool with them staying).

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

the web platform uses **filesystem routing:** the location of your file on the repo directly maps to its URL. e.g. `app/docs/leadership/about.md` → `compsigh.club/docs/leadership/about`.

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

## Components

Markdown is awesome, but sometimes we want to make our content more visual or interactive. for this, we made some fun custom components you can embed!

<Spacer size={16} />

### `Grid`

the `Grid` component lets you split from the default single-column layout of the page.

for example, let's say you have a screenshot from your phone. in the single-column layout, images are resized such that their width fills the page (`700px`), and their height is adjusted to maintain aspect ratio. that screenshot would be stupid tall lol. with the `Grid` component you can put it to the side of some text, which makes for a much better reading experience.

props:

- `columns: number` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
divides all children of `Grid` by this number
- `columnSizeDistribution: string[]` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
override the default even-division behavior to create custom layouts like 1:2:1

<Note>
**good to know:** `Grid` divides "top-level" children. this means if you want to treat a group of text as one, you'll want to wrap it with a parent element, such as a `<div>`.
</Note>

example:

```tsx
<Grid columns={2} columnSizeDistribution={["1fr", "3fr"]}>
  <Media video={true} src="/assets/cue-invite-cards.mp4" />
  <div>
    We really liked the idea of invites, and we went all out, because why not?

    We produced a set of 50 *physical* invite cards, each with their own unique invite linked via QR code.

    Invites had conditions like `no-invite` (invited students can't also +1) to help us scale reasonably.

    We also gave these out at Destination USF.
  </div>
</Grid>
```

<Playground>
  <div style={{ padding: '16px 32px' }}>
    <Grid columns={2} columnSizeDistribution={["1fr", "3fr"]}>
      <Media
        video={true}
        src="/assets/cue-invite-cards.mp4"
      />
      <div>
We really liked the idea of invites, and we went all out, because why not?

We produced a set of 50 *physical* invite cards, each with their own unique invite linked via QR code.

Invites had conditions like `no-invite` (invited students can't also +1) to help us scale reasonably.

We also gave these out at Destination USF.
      </div>
    </Grid>
  </div>
</Playground>

<Spacer size={32} />

### `Media`

Markdown has a native way to embed images, but the web platform uses our optimized component instead, which also lets us nicely add captions or links

props:

- `src: string` <span style={{ color: 'red' }}>(required)</span><br />
a filepath relative to the `public/` directory to the image or video to embed
- `video: boolean` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
set to `true` if the media content is a video
- `title: string` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
a caption placed directly under the image
- `description: string | React.ReactElement` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
a more subtle caption, if additional context would help
- `cta: string` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
"call to action"; displays under the title or description if present, would be something like "Watch video"
- `link: string` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
clicking on the image, title, or `cta` will take the reader to this URL
- `alt: string` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
a description of the media, for accessibility

example:

```tsx
<Media
  title="compsigh landing page"
  description="Work in progress on a new web platform for compsigh, the computer science club at the University of San Francisco"
  video={true}
  src="/assets/compsigh-landing-page.mp4"
  link="https://compsigh.club"
  cta="View live demo"
/>
```

<Spacer size={16} />

### `Mic`

for multi-authored posts, it sometimes helps to know whose words you're reading. with `Mic`, you can indicate when you're "handing the mic" to a specific author:

```plaintext showLineNumbers
<Mic name="Edward" avatar="/avatars/edward.png" />

what's good y'all?

here's Gursh with some insightful words

<Mic name="Gursh" avatar="/avatars/gursh.png" />

yo ✌🏽

Jet wsp

<Mic name="Jet" avatar="/avatars/jet.png" />

this page is getting kinda long bruh

lunch anyone?
```

<Mic name="Edward" avatar="/avatars/edward.png" />

what's good y'all?

here's Gursh with some insightful words

<Mic name="Gursh" avatar="/avatars/gursh.png" />

yo ✌🏽

Jet wsp

<Mic name="Jet" avatar="/avatars/jet.png" />

this page is getting kinda long bruh

lunch anyone?

<Spacer size={16} />

### `Note`

useful for "good to know" type comments:

```tsx
<Note>
  compsigh is a social computer science club for meeting cool people & building cool things
</Note>
```

<Note>
  compsigh is a social computer science club for meeting cool people & building cool things
</Note>

<Spacer size={16} />

### `Playground`

useful for examples, or showcases that can't be used in `Media`:

```tsx
<Playground>
  this content is not editable
</Playground>
```

<Playground>
  this content is not editable
</Playground>

<Spacer size={16} />

```tsx
<Playground editable>
  this content is editable *(click me!)*
</Playground>
```

<Playground editable>
  this content is editable *(click me!)*
</Playground>

<Spacer size={32} />

### `Spacer`

add vertical space anywhere:

```tsx
these two paragraphs could use some space

<Spacer size={16} />

these two paragraphs could use some space
```

<Playground>
  these two paragraphs could use some space

  <Spacer size={16} />

  these two paragraphs could use some space
</Playground>
