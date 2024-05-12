import { Client, isFullPage } from '@notionhq/client'

export async function fetchEvents() {
  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY })
    const eventsDatabaseId = process.env.NOTION_EVENTS_DATABASE_ID as string

    const response = await notion.databases.query({
      database_id: eventsDatabaseId,
      filter: {
        and: [
          {
            property: 'Date',
            date: {
              on_or_after: '2024-01-22'
            }
          },
          {
            property: 'Date',
            date: {
              on_or_before: '2024-05-17'
            }
          },
          {
            or: [
              {
                property: 'Type',
                select: {
                  equals: 'event'
                }
              },
              {
                property: 'Type',
                select: {
                  equals: 'workshop'
                }
              }
            ]
          }
        ]
      }
    })

    const fullPageObjects = response.results.filter(isFullPage)
    const events = fullPageObjects
    .map((page) => {
      return {
        id: page.id,
        // @ts-ignore
        title: page.properties.Name.title[0].text.content as string,
        // @ts-ignore
        date: new Date(page.properties.Date.date.start).toLocaleString(
          'en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          }
        ) as string,
        // @ts-ignore
        type: page.properties.Type.select.name as string
      }
    })
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

    return events
  }
  catch (error) {
    return [{
      id: 'error',
      type: 'error',
      title: 'Error fetching events',
      date: 'see console for details'
    }]
  }
}
