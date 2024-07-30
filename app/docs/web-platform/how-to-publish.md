---
title: "How to publish on the compsigh web platform"
description: "Guidelines & tips on getting your work out there and shared by the club"
authors: [{ name: "Edward", avatar: "/avatars/edward.png" }]
previous: { text: "Why share your work on the compsigh web platform", link: "/docs/web-platform/why-publish" }
---

<Note>
Hi! 👋

This beginner-friendly guide covers everything you need to know to start publishing on the compsigh web platform. It includes the basics on writing in <CasePreserver>Markdown</CasePreserver> and using the custom <CasePreserver>React</CasePreserver> components the web platform provides, and suggests resources for learning more about both <CasePreserver>Markdown</CasePreserver> and <CasePreserver>React</CasePreserver>.

You can also choose which parts of the process to learn more about, at your own pace, by clicking the toggleable <span style={{ fontFamily: 'var(--font-proto-mono)', color: 'var(--color-compsigh)' }}>&gt;</span> icon at each section.

I recommend you read through the guide, but if you'd rather just get going with a template to copy and remix, [check out the Cue post on GitHub](https://github.com/compsigh/web/blob/main/app/projects/cue.md?plain=1)!
</Note>

## Getting set up

<details>
<summary>The [web platform is open source](https://github.com/compsigh/web), and all contributions take place on our repo. Get started by forking & cloning a local copy, and opening it up in your editor of choice. If you're new to the process, check out [GitHub's resources for contributing to another project](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project).</summary>

<Note>
I personally edit all notes directly in <CasePreserver>VS Code</CasePreserver> with [my minimalist setup](https://edward.so/notes/vs-code). There are tons of helpful extensions to build on top of this, even <CasePreserver>Grammarly</CasePreserver>!
</Note>

Before we continue, you'll want to make sure you have [<CasePreserver>Node.js</CasePreserver>](https://nodejs.org) installed, at least version `v20.0.0`.

Once you have <CasePreserver>Node.js</CasePreserver> installed, open a terminal session inside your cloned fork of the web platform and run `npm install` to install the dependencies.

Finally, run `npm run dev` and open `http://localhost:3000` in your browser to preview your changes (hit `^C` to stop it). I recommend having this up while you're writing so you can refresh the page and see how everything looks.
</details>

## Markdown

<details>
<summary>Every post in the community tab is written in <CasePreserver>Markdown</CasePreserver>, the same text formatting language <CasePreserver>GitHub</CasePreserver>, <CasePreserver>Discord</CasePreserver>, and many other platforms use.</summary>

```plaintext showLineNumbers
In a Markdown file, we can *italicize text* by putting one asterisk around it, or **bold text** by putting two asterisks around it.

We can also make lists:

- Item 1
- Item 2
- Item 3

Plus embed images, headings, and more.
```

<Playground>
  <div
    style={{
      alignSelf: 'flex-start',
      padding: '8px 32px'
    }}
  >
    <CasePreserver>
In a Markdown file, we can *italicize text* by putting one asterisk around it, or **bold text** by putting two asterisks around it.

We can also make lists:

- Item 1
- Item 2
- Item 3

Plus embed images, headings, and more.
    </CasePreserver>
  </div>
</Playground>

Check out the [<CasePreserver>Markdown</CasePreserver> guide](https://markdownguide.org) for more info on syntax and why it's a great, platform-independent language of choice.
</details>

## Metadata

<details>
<summary>Each <CasePreserver>Markdown</CasePreserver> file has a metadata block — a series of key-value pairs — at the top of it, separated by three dashes. For the web platform, there are specific metadata fields that impact how content is presented.</summary>

Here is an example of a metadata block:

```plaintext showLineNumbers {1-5}
---
title: "What can we do in a Markdown file?"
published: true
date: 2024-07-27
---

In a Markdown file, we can...
```

<Spacer size={8} />

Here are the required and optional fields you can use when writing posts on the web platform:

<Spacer size={8} />

### `title`

`string`

<p style={{color: 'red' }}>(Required)</p>

This will show up at the top of the page, in the Community tab, in search engines, and when you share a link to your post.

<Spacer size={16} />

### `description`

`string`

<p style={{color: 'red' }}>(Required)</p>

This doesn't show up on the page itself, but like `title`, is used in the Community tab, search engines, and elsewhere when shared.

<Spacer size={16} />

### `authors`

`{ name: string, avatar: string }[]`

<p style={{color: 'red' }}>(Required)</p>

This shows up at the top of the page, as well as in the Community tab.

- `name` can be whatever you want — *most put their <CasePreserver>Discord</CasePreserver> username to keep with the theme :)*
- `avatar` represents a filepath, relative to the `public/` directory, to the image displayed next to your name

Example:

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

<p style={{ color: 'var(--color-light-50)' }}>(Optional)</p>

<p style={{ color: 'var(--color-light-50)' }}>Default: generated based on `title` and `authors`</p>

"og" stands for opengraph, a standard for metadata across the Web. The `og_image` is a filepath, relative to the `public/` directory, to an image that'll be used when you share a link to your post (like the image on a <CasePreserver>Discord</CasePreserver> embed).

If you do upload one *(encouraged!)*, if possible, please ensure it is `1200 × 630` pixels. This is the standard and will guarantee your image looks good on all platforms (<CasePreserver>LinkedIn</CasePreserver>, <CasePreserver>Discord</CasePreserver>, <CasePreserver>Slack</CasePreserver>, <CasePreserver>Twitter</CasePreserver>, etc.).

<Spacer size={16} />

### `decorations`

`boolean`

<p style={{ color: 'var(--color-light-50)' }}>(Optional)</p>

<p style={{ color: 'var(--color-light-50)' }}>Default: `true`</p>

If you have a display of `1420px` or wider, you'll see the decorations strewn across the margins of the page. As fun as they are, I totally get it if you want to hide them, especially when sending to a potential employer. You can do so by specifying `decorations: false`.

<Spacer size={16} />

### `previous` / `next`

`{ text: string, link: string }`

<p style={{ color: 'var(--color-light-50)' }}>(Optional)</p>

If you're writing a series of posts (for example, clone workshop notes), this is a great way to link them together. It will display a link for each at the bottom of the page. An example from [compsigh leadership](/docs/leadership/about):

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

<p style={{ color: 'var(--color-light-50)' }}>(Optional)</p>

<p style={{ color: 'var(--color-light-50)' }}>Default: based on the location of your file</p>

The web platform uses **filesystem routing:** your post's <CasePreserver>URL</CasePreserver> directly maps to where it is on the repo. e.g. a file at `app/docs/leadership/about.md` becomes `https://compsigh.club/docs/leadership/about`.

If you want to bind your post to a route other than where your file is located, you can specify a `slug` relative to the root route (the `app/` directory).

An appropriate use case would be where you have an ordered list of posts for your compsigh clone workshop, structured like this:

- `/events/my-workshop/01-getting-started.md`
- `/events/my-workshop/02-installing.md`
- `/events/my-workshop/03-building.md`

If the numbers help you stay organized in the repo, but you don't want them to show up in the <CasePreserver>URL</CasePreserver>, you can use `slug` to remove them.

Example for a file at `/events/my-workshop/01-getting-started.md`:

```plaintext showLineNumbers {3}
---
title: "My workshop: Getting started"
slug: "/events/my-workshop/getting-started"
---
```

</details>

## Dos & don'ts

Things that are encouraged:

- 🏗️ **Hack around & experiment:** You have access to not just posts, but the whole codebase! Have an idea for a cool <CasePreserver>React</CasePreserver> component? Ship it ⚛️
- 🎨 **Modify styles:** As partial as I am to the ones we have :) it's totally ok for you to change as much or as little as you want.

<details>
<summary>Here's an example:</summary>

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
</details>

Things that will get your post flagged:

- 🖼 **Embedding third-party content:** e.g. instead of loading an image from a <CasePreserver>URL</CasePreserver>, it's preferred you upload it to the `public/assets/` directory. "Third-party content" especially includes scripts or suspicious `<iframe>`s. But, for example, your data vis project might use <CasePreserver>Tableau</CasePreserver>; that's totally fine!
- 🚫 **Content that violates the club's content policies:** compsigh is strongly pro-free speech, and as a club we think it's important to stoke thought-provoking discussion. But there's a time & place for everything. :) Please avoid including content that could be considered:
  - <CasePreserver>NSFW</CasePreserver>
  - Defamatory
  - Overly political
  - Illegal or promoting illegal activity

## Components

<details>
<summary>Markdown is awesome, but sometimes we want to make our content more visual or interactive. For this, we made some fun custom components you can embed!</summary>

<Spacer size={16} />

### `Grid`

The `Grid` component lets you split from the default single-column layout of the page.

For example, let's say you have a screenshot from your phone. In the single-column layout, images are resized such that their width fills the page (`700px`), and their height is adjusted to maintain aspect ratio. That screenshot would be stupid tall lol. With the `Grid` component you can put it to the side of some text, which makes for a much better reading experience.

Props:

- `columns: number` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
Divides all children of `Grid` by this number
- `columnSizeDistribution: string[]` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
Override the default even-division behavior to create custom layouts like 1:2:1

<Note>
**Good to know:** `Grid` divides "top-level" children. This means if you want to treat a group of text as one, you'll want to wrap it with a parent element, such as a `<div>`.
</Note>

Example:

```tsx showLineNumbers
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
        <CasePreserver>
We really liked the idea of invites, and we went all out, because why not?

We produced a set of 50 *physical* invite cards, each with their own unique invite linked via QR code.

Invites had conditions like `no-invite` (invited students can't also +1) to help us scale reasonably.

We also gave these out at Destination USF.
        </CasePreserver>
      </div>
    </Grid>
  </div>
</Playground>

<Spacer size={32} />

### `Media`

Markdown has a native way to embed images, but the web platform uses our optimized component instead, which also lets us nicely add captions or links.

Props:

- `src: string` <span style={{ color: 'red' }}>(required)</span><br />
A filepath relative to the `public/` directory to the image or video to embed
- `video: boolean` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
Set to `true` if the media content is a video
- `title: string` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
A caption placed directly under the image
- `description: string | React.ReactElement` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
A more subtle caption, if additional context would help
- `cta: string` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
"Call to action"; displays under the title or description if present, would be something like "Watch video"
- `link: string` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
Clicking on the image, title, or `cta` will take the reader to this <CasePreserver>URL</CasePreserver>
- `alt: string` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
A description of the media, for accessibility

Example:

```tsx showLineNumbers
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

For multi-authored posts, it sometimes helps to know whose words you're reading. With `Mic`, you can indicate when you're "handing the mic" to a specific author:

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

<CasePreserver>
<Mic name="Edward" avatar="/avatars/edward.png" />

what's good y'all?

here's Gursh with some insightful words

<Mic name="Gursh" avatar="/avatars/gursh.png" />

yo ✌🏽

Jet wsp

<Mic name="Jet" avatar="/avatars/jet.png" />

this page is getting kinda long bruh

lunch anyone?
</CasePreserver>

<Spacer size={16} />

### `Note`

Useful for "good to know" type comments:

```tsx showLineNumbers
<Note>
  compsigh is a social computer science club for meeting cool people & building cool things
</Note>
```

<Note>
  compsigh is a social computer science club for meeting cool people & building cool things
</Note>

<Spacer size={16} />

### `Playground`

Useful for examples, or showcases that can't be used in `Media`:

```tsx showLineNumbers
<Playground>
  this content is not editable
</Playground>
```

<Playground>
  this content is not editable
</Playground>

<Spacer size={16} />

```tsx showLineNumbers
<Playground editable>
  This content is editable *(click me!)*
</Playground>
```

<Playground editable>
  This content is editable *(click me!)*
</Playground>

<Spacer size={32} />

### `Spacer`

Add vertical space anywhere:

```tsx showLineNumbers
These two paragraphs could use some space

<Spacer size={16} />

These two paragraphs could use some space
```

<Playground>
  These two paragraphs could use some space

  <Spacer size={16} />

  These two paragraphs could use some space
</Playground>
</details>
