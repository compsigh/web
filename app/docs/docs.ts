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
    name: 'Leadership',
    entries: [
      {
        text: 'About',
        link: '/docs/leadership/about'
      },
      {
        text: 'Joining',
        link: '/docs/leadership/joining'
      }
    ]
  },
  {
    name: 'Web Platform',
    entries: [
      {
        text: 'Publishing',
        link: '/docs/web-platform/publishing'
      }
    ]
  }
]
