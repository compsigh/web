import { type StructuredSidebarProps } from '@/components/Sidebar'

export const docs: StructuredSidebarProps =
[
  {
    text: 'README',
    link: '/docs/readme'
  },
  {
    text: 'Values',
    link: '/docs/values'
  },
  {
    name: 'unpaid interns',
    entries: [
      {
        text: 'Intro',
        link: '/docs/leadership/unpaid-interns'
      },
      {
        text: 'Joining the team',
        link: '/docs/leadership/joining-the-team'
      }
    ]
  }
]
