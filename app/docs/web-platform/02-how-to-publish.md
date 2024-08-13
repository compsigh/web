---
title: "How to publish on the compsigh web platform"
description: "Guidelines & tips on getting your work out there and shared by the club"
authors: [{ name: "Edward", avatar: "/avatars/edward.png" }]
previous: { text: "Why share your work on the compsigh web platform", link: "/docs/web-platform/why-publish" }
decorations: false
slug: "docs/web-platform/how-to-publish"
---

<Note>
This beginner-friendly guide covers everything you need to know to start publishing on the compsigh web platform! It includes:

- The basics on writing in standardized <CasePreserver>Markdown</CasePreserver>
- Specifics about the web platform, like using its <CasePreserver>React</CasePreserver> components
- The process for getting your work published once you've written it

You can also choose which parts of the process to learn more about, at your own pace, by clicking the toggleable <span style={{ fontFamily: 'var(--font-proto-mono)', color: 'var(--color-compsigh)' }}>&gt;</span> icon at each section.

I recommend you read through the guide, but if you'd rather just get going with a template to copy and remix, [check out the Cue post on GitHub](https://github.com/compsigh/web/blob/main/app/projects/cue.md?plain=1)!
</Note>

## Getting set up

<details>
<summary>The [web platform is open source](https://github.com/compsigh/web), and all contributions take place on our repo. Get started by forking & cloning a local copy, and opening it up in your editor of choice. If you're new to the process, check out [GitHub's resources for contributing to another project](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project).</summary>

I personally edit all notes directly in <CasePreserver>VS Code</CasePreserver>. If the out-of-the-box experience feels too cluttered, check out [the setup I use](https://edward.so/notes/vs-code). There are tons of helpful VS Code extensions as well, even <CasePreserver>Grammarly</CasePreserver>!

Before we continue, you'll want to make sure you have [<CasePreserver>Node.js</CasePreserver>](https://nodejs.org) installed, at least version `v20.0.0`.

For Windows, I recommend following the prerequisites of [<CasePreserver>Microsoft</CasePreserver>'s guide to setting up <CasePreserver>WSL</CasePreserver> for <CasePreserver>Next.js</CasePreserver>](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nextjs-on-wsl).

Once you have <CasePreserver>Node.js</CasePreserver> installed, open a terminal session inside your cloned fork of the web platform and run `npm install` to install the dependencies.

Finally, run `npm run dev` and open `http://localhost:3000` in your browser to preview your changes (hit `^C` to stop it). I recommend having this up while you're writing so you can refresh the page and see how everything looks.
</details>

## Writing content

The web platform uses **filesystem routing:** your post's <CasePreserver>URL</CasePreserver> directly maps to where it is on the repo.

| If your post's filepath is | Your post is accessible at compsigh.club/ |
| :- | :- |
| `app/community/cue.md` | community/cue |
| `app/community/viper.md` | community/viper |
| `app/docs/readme.md` | docs/readme |
| `app/docs/leadership/about.md` | docs/leadership/about |

You can override this behavior by using the [Metadata](#metadata) `slug` field.

Get started by creating a file based on where you want it to be available online.

### Using Markdown

<details>
<summary>Every post in the Community tab is written in <CasePreserver>Markdown</CasePreserver>, the same text formatting language <CasePreserver>GitHub</CasePreserver>, <CasePreserver>Discord</CasePreserver>, and many other platforms use:</summary>

```markdown showLineNumbers title="example.md"
In a Markdown file, we can *italicize text* by putting one asterisk around it, or **bold text** by putting two asterisks around it.

We can also make lists:

- Item 1
- Item 2
- Item 3

Plus embed images, headings, and more.
```

This becomes:

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

### Using React

<details>
<summary><CasePreserver>Markdown</CasePreserver> is great, but with the power of <CasePreserver>React</CasePreserver>, we can make our content more visual and interactive. Everything you need to know about using the web platform's <CasePreserver>React</CasePreserver> components is in their documentation below, but if you'd rather get comfortable with the framework first, this is the *Hello World* to read!</summary>

[<CasePreserver>React</CasePreserver>](https://react.dev) is a <CasePreserver>JavaScript</CasePreserver> framework for crafting *composable* <CasePreserver>UI</CasePreserver>s. Before the "component era" of web development, developers had to manually place elements *on each page they appeared.* Can you imagine writing a sidebar 10+ times? <CasePreserver>React</CasePreserver> and other frameworks like it allow developers to "componentize" <CasePreserver>UI</CasePreserver> so that it can be reused across our application.

Let's take a look at a simplified example. You might have an application where each page greets the user:

<Grid columns={2}>
  ```html title="about.html"
  <h1>Hi there!</h1>
  <p>Welcome to the About page</p>
  ```
  ```html title="events.html"
  <h1>Hi there!</h1>
  <p>Welcome to the Events page</p>
  ```
</Grid>

What happens if you want to change the greeting, perhaps from "<CasePreserver>Hi there!</CasePreserver>" to "<CasePreserver>Hey!</CasePreserver>"? You'd have to update `about.html`, `events.html`, and every other page where that greeting exists.

Let's use the power of <CasePreserver>React</CasePreserver> to componentize the greeting:

```jsx showLineNumbers title="Greeting.jsx"
function Greeting() {
  return <h1>Hi there!</h1>
}
```

That's it — this is the *Hello World* of <CasePreserver>React</CasePreserver>! This looks very similar to <CasePreserver>HTML</CasePreserver>: it's called <CasePreserver>JSX</CasePreserver>, or "<CasePreserver>JavaScript XML</CasePreserver>".

**A <CasePreserver>React</CasePreserver> component is a function that returns JSX.**

Let's update our application to use our new `Greeting` component.

<Grid columns={2}>
  ```jsx title="about.jsx"
  <Greeting />
  <p>Welcome to the About page</p>
  ```
  ```jsx title="events.jsx"
  <Greeting />
  <p>Welcome to the Events page</p>
  ```
</Grid>

Note that if a <CasePreserver>React</CasePreserver> component doesn't take children (like how that `<p>` takes a string of text as a child), it can self-close, like in the example above.

Just like <CasePreserver>HTML</CasePreserver> elements can take attributes, so too can <CasePreserver>React</CasePreserver> components take "props": a set of key-value pairs that influences the look and/or behavior of the component.

For example, our greeting isn't very personal. Let's make it so:

```jsx showLineNumbers title="Greeting.jsx"
function Greeting(props) {
  return <h1>Hi {props.name}!</h1>
}
```

<Grid columns={2}>
  ```jsx title="events.jsx"
  <Greeting name="Edward" />
  <p>Welcome to the Events page</p>
  ```
  ```html title="events.html" caption="This is what gets rendered!"
  <h1>Hi Edward!</h1>
  <p>Welcome to the Events page</p>
  ```
</Grid>

I think that should be enough context for us here.

This mini intro was intentionally minimal — there is so much more to <CasePreserver>React</CasePreserver>, and I recommend [the <CasePreserver>React</CasePreserver> docs](https://react.dev) if you're interested in learning more. It's a good time to be a web dev. :)
</details>

### Adding media

<details>
<summary>You can upload any media — images, videos, etc. — related to your post to the `public/` folder, with a filepath that mirrors its URL:</summary>

| If your post is accessible at compsigh.club/ | Your post's media should be in |
| :- | :- |
| community/cue | `public/community/cue/` |
| community/viper | `public/community/viper/` |
| events/2024-08-30/compsigh-night | `public/events/2024-08-30/` |
| events/2024-08-30/compsigh-clone | `public/events/2024-08-30/` |

And so on.

*If possible, please compress your media!* We want to be courteous to everyone that has the repo cloned; let's not bloat it. Here are a couple strategies to reduce filesize:

- If your media is a non-transparent image, convert it to JPEG
  - On Mac, right-click the image, go to Quick Actions, then click Convert Image
  - On Windows, you can open the image in MS Paint, hit File, then Save as, then JPEG picture
- Downscale: media is always rendered at a maximum width of `700px` anyway

Normally, media can be embedded in Markdown like so:

```markdown title="example.md"
![description of the image](/path/to/image.png)
```

On the web platform, we use a dedicated `Media` component, which auto-optimizes for performance, and also lets us add captions or links:

<Note>
`Media` is a React component. Everything you need to know to use it effectively is right here, but if you'd rather get comfortable with React first, check out the [Using React](#using-react) section above.
</Note>

Props:

- `src: string` <span style={{ color: 'red' }}>(required)</span><br />
A filepath, relative to the `public/` directory, to the image or video to embed
- `title: string` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
A caption placed directly under the image
- `description: string | React.ReactElement` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
A more subtle caption, if additional context would help
- `cta: string` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
"Call to action"; displays under the title or description if present
- `link: string` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
Clicking on the image, title, or `cta` will take the reader to this <CasePreserver>URL</CasePreserver>
- `alt: string` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
A description of the media, for accessibility

Example:

```mdx showLineNumbers title="example.md"
<Media
  title="compsigh landing page"
  description="Work in progress on a new web platform for compsigh, the computer science club at the University of San Francisco"
  src="/docs/web-platform/compsigh-landing-page.mp4"
  link="https://compsigh.club"
  cta="View live demo"
/>
```

<Playground>
  <div style={{ padding: '0 32px' }}>
    <Media
      title="compsigh landing page"
      description="Work in progress on a new web platform for compsigh, the computer science club at the University of San Francisco"
      src="/docs/web-platform/compsigh-landing-page.mp4"
      link="https://compsigh.club"
      cta="View live demo"
    />
  </div>
</Playground>

<Note>
`Media` will only accept local files — that is, files that you add to the repo. Please avoid embedding external media or other kinds of third-party content (scripts, `<iframe>`s, etc.). Certain sources are acceptable; for example, your data vis project might use <CasePreserver>Tableau</CasePreserver>.
</Note>
</details>

### Showcasing code and examples

Markdown uses "code fences" — three backticks (\`\`\`) — around a snippet to render it as a code block. The web platform uses the `rehype-pretty-code` library for syntax highlighting. Check out [their documentation on meta strings](https://rehype-pretty.pages.dev/#meta-strings), which allow you to specify a language, file name, and highlight lines.

<details>
<summary>There is also a `Playground` component, which is good for interactive showcases or examples:</summary>

```mdx showLineNumbers title="example.md"
<Playground>
  This content is not editable
</Playground>
```

<Playground>
  This content is not editable
</Playground>

<Spacer size={16} />

```mdx showLineNumbers title="example.md"
<Playground editable>
  This content is editable *(click me!)*
</Playground>
```

<Playground editable>
  This content is editable *(click me!)*
</Playground>
</details>

### Authoring your post

You can use the [Metadata](#metadata) `authors` field to add your name to the top of the page. Add a square (`1:1` aspect ratio) image to the `public/avatars/` directory and reference it in the `avatar` property of your author object.

### Writing multi-authored posts

<details>
<summary>You can use the [Metadata](#metadata) `authors` field to add multiple authors to the top of a page. For these kinds of posts, it can help to know whose words one is reading. With `Mic`, you can indicate when you're "handing the mic" to a specific author:</summary>

```mdx showLineNumbers title="example.md"
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
</details>

### Displaying content side-by-side

<details>
<summary>The `Grid` component lets you split from the default single-column layout:</summary>

Say you have a screenshot from your phone. In the single-column layout, images are resized so that their width fills the page (`700px`), and their height is adjusted to maintain aspect ratio. That screenshot would be unpleasantly tall! With the `Grid` component, you can put it to the side of some text, which makes for a much better reading experience.

Props:

- `columns: number` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
Divides all children of `Grid` by this number
- `columnSizeDistribution: string[]` <span style={{ color: 'var(--color-light-50)' }}>(optional)</span><br />
Override the default even-division behavior to create custom layouts like 1:2:1

<Note>
**Good to know:** `Grid` divides "top-level" children. This means if you want to treat a group of text as one, you'll want to wrap it with a parent element, such as a `<div>`.
</Note>

Example:

```mdx showLineNumbers title="example.md"
<Grid columns={2} columnSizeDistribution={["1fr", "3fr"]}>
  <Media src="/community/cue/invite-cards.mp4" />
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
      <Media src="/community/cue/invite-cards.mp4" />
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
</details>

### Adding asides

<details>
<summary>Sometimes you have a good-to-know or by-the-way you want to add in without distracting the reader from the main content. In such cases you can use the `Note` component:</summary>

`Note` doesn't take any props; simply wrap your content with it:

```mdx showLineNumbers title="example.md"
<Note>
  compsigh is a social computer science club for meeting cool people & building cool things
</Note>
```

<Note>
  compsigh is a social computer science club for meeting cool people & building cool things
</Note>
</details>

### Adding vertical space

<details>
<summary>You can use `Spacer` to add breathing room to information-dense posts:</summary>

```mdx showLineNumbers title="example.md" caption="The units are in pixels"
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

## Metadata

<details>
<summary>Each <CasePreserver>Markdown</CasePreserver> file has a metadata block — a series of key-value pairs — at the top of it, separated by three dashes. For the web platform, there are specific metadata fields that impact how content is presented.</summary>

Here's an example of a metadata block:

```markdown showLineNumbers {1-5} title="example.md"
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

<p style={{ color: 'var(--color-light-50)' }}>(Optional)</p>

This shows up at the top of the page, as well as in the Community tab.

- `name` can be whatever you want — *most put their <CasePreserver>Discord</CasePreserver> username to keep with the theme :)*
- `avatar` represents a filepath, relative to the `public/` directory, to the image displayed next to your name

```markdown showLineNumbers {4-7} title="community/cue.md"
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

```markdown showLineNumbers {4,5} title="leadership/01-about.md"
---
title: "compsigh leadership"
description: "The mission & methods of club leadership"
previous: { text: "compsigh values", link: "/docs/values" }
next: { text: "Joining leadership", link: "/docs/leadership/joining" }
---
```

<Spacer size={16} />

### `slug`

`string`

<p style={{ color: 'var(--color-light-50)' }}>(Optional)</p>

<p style={{ color: 'var(--color-light-50)' }}>Default: based on the location of your file</p>

As mentioned in [Writing Content](#writing-content), the web platform uses **filesystem routing:** your post's <CasePreserver>URL</CasePreserver> directly maps to where it is on the repo.

If you want to bind your post to a route other than where your file is located, you can specify a `slug` relative to the root route (the `app/` directory).

An appropriate use case would be where you have an ordered list of posts for your compsigh clone workshop, structured like this:

- `events/my-workshop/01-getting-started.md`
- `events/my-workshop/02-installing.md`
- `events/my-workshop/03-building.md`

If the numbers help you stay organized in the repo, but you don't want them to show up in the <CasePreserver>URL</CasePreserver>, you can use `slug` to remove them:

```markdown showLineNumbers {3} title="events/my-workshop/01-getting-started.md"
---
title: "My workshop: Getting started"
slug: "events/my-workshop/getting-started"
---
```

</details>

## Publishing your post

<details>
<summary>Once you're ready, go ahead and open a PR to merge your fork into the `main` branch of the web platform. Here's what happens next:</summary>

When you open the PR, it'll prefill the description. Please make sure you double-check before submitting:

- You've previewed your post locally with `npm run dev` and are happy with it
- You've confirmed `npm run build` runs successfully
- You've made sure all media is in a folder mirroring your post's URL in the `public/` directory

Also, you're asked to what degree you're open to feedback, if any. Feedback will most likely come in the form of suggestions directly on the PR. Each change will have an option to accept the suggestion, reject it, or batch it along with others to accept as one commit.

Once the PR is opened, the platforms team will review it and give feedback to the degree you mentioned. Assuming all checks out and the PR gets merged, congrats! It's live and ready to share.
</details>
