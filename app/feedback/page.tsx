import { Suspense } from "react"
import { type Metadata } from "next"

import { Spacer } from "@/components/Spacer"
import { PostWrapper } from "@/components/PostWrapper"

export const metadata: Metadata = {
  title: "feedback",
  description:
    "Share your thoughts, suggestions, and ideas with the compsigh community",
  openGraph: {
    siteName: "compsigh",
    images: [
      {
        url: "api/og?title=feedback&description=Share your thoughts, suggestions, and ideas with the compsigh community",
        width: 1200,
        height: 630,
        alt: ""
      }
    ]
  }
}

function FeedbackContent() {
  return (
    <div>
      <p>
        We'd love to get your feedback on compsigh! Let us know your thoughts,
        complaints, suggestions, and more!
      </p>
      <p>
        Your feedback is anonymous and will be reviewed by the compsigh
        leadership team 💛
      </p>

      <Spacer size={32} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "500px",
          background: "var(--color-dark-10)",
          border: "1px dashed var(--color-compsigh-60)",
          borderRadius: "8px",
          padding: "20px"
        }}
      >
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeDmfn_ggtqSlV3FhMda3syZ5GOfeXw3m_LDzF90WqDIKQ45Q/viewform?embedded=true"
          width="100%"
          height="483"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          style={{
            maxWidth: "640px",
            border: "none",
            borderRadius: "6px"
          }}
        >
          Loading…
        </iframe>
      </div>

      <Spacer size={32} />
    </div>
  )
}

export default function FeedbackPage() {
  const frontmatter = {
    title: "feedback",
    description:
      "Share your thoughts, suggestions, and ideas with the compsigh community",
    decorations: true
  }

  return (
    <>
      <Suspense>
        <PostWrapper content={<FeedbackContent />} frontmatter={frontmatter} />
        <Spacer size="20vh" />
      </Suspense>
    </>
  )
}
