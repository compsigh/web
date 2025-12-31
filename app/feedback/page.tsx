// Components
import { Suspense } from "react"
import { Spacer } from "@/components/Spacer"
import { PostWrapper } from "@/components/PostWrapper"

// Types
import type { Frontmatter } from "../[...slug]/page"

function FeedbackContent() {
  return (
    <>
      <p>
        We&apos;d love to get your feedback on compsigh! Let us know your
        thoughts, complaints, suggestions, and more!
      </p>
      <p>
        Your feedback is anonymous and will be reviewed by the compsigh
        leadership team 💛
      </p>

      <Spacer size={32} />
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSeDmfn_ggtqSlV3FhMda3syZ5GOfeXw3m_LDzF90WqDIKQ45Q/viewform?embedded=true"
        width="100%"
        height="700"
        style={{ border: "none" }}
      ></iframe>
    </>
  )
}

export default function Feedback() {
  const frontmatter: Frontmatter = {
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
