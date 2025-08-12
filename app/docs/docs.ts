import { type StructuredSidebarProps } from '@/components/Sidebar'

export const docs: StructuredSidebarProps =
[
  {
    text: 'About compsigh',
    link: '/docs/about'
  },
  {
    text: 'Values',
    link: '/docs/values'
  },
  {
    text: 'Code of Conduct',
    link: '/docs/code-of-conduct'
  },
  {
    text: 'Support the club',
    link: '/support'
  },
  {
    text: 'Friends of compsigh',
    link: '/docs/friends'
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
      },
      {
        text: 'Team',
        link: '/docs/leadership/team'
      }
    ]
  },
  {
    name: 'Web platform',
    entries: [
      {
        text: 'Why publish',
        link: '/docs/web-platform/why-publish'
      },
      {
        text: 'How to publish',
        link: '/docs/web-platform/how-to-publish'
      }
    ]
  }
]
