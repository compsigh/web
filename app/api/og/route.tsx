import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const hasTitle = searchParams.has('title')
  const title = hasTitle
    ? searchParams.get('title')
    : 'compsigh'

  const description = searchParams.get('description')
  if (!description)
    return new Response('Missing description', { status: 400 })

  // Bandaid solution: hardcoding the avatars for now since a dynamic fetch() doesn't work
  // Will likely switch to raw Satori; way too many limitations with Edge Functions
  const authorAvatarFilenamesToPermalinks: Map<string, string> = new Map([
    ['/avatars/andrew.png', 'https://raw.githubusercontent.com/compsigh/web/main/public/avatars/andrew.png'],
    ['/avatars/antoinette.png', 'https://raw.githubusercontent.com/compsigh/web/main/public/avatars/antoinette.png'],
    ['/avatars/calvin.png', 'https://raw.githubusercontent.com/compsigh/web/main/public/avatars/calvin.png'],
    ['/avatars/edward.png', 'https://raw.githubusercontent.com/compsigh/web/main/public/avatars/edward.png'],
    ['/avatars/gursh.png', 'https://raw.githubusercontent.com/compsigh/web/main/public/avatars/gursh.png'],
    ['/avatars/jet.png', 'https://raw.githubusercontent.com/compsigh/web/main/public/avatars/jet.png'],
    ['/avatars/quinn.png', 'https://raw.githubusercontent.com/compsigh/web/main/public/avatars/quinn.png'],
    ['/avatars/sanju.jpeg', 'https://raw.githubusercontent.com/compsigh/web/main/public/avatars/sanju.jpeg']
  ])

  const authorNamesParam = searchParams.getAll('author')
  const authorAvatarsParam = searchParams.getAll('avatar')
  const authors = authorNamesParam.map((authorName, index) => {
    const authorAvatar = authorAvatarFilenamesToPermalinks.get(authorAvatarsParam[index])
    return {
      name: authorName,
      avatar: authorAvatar
    }
  })

  const compsighLogo = await fetch(
    new URL('../../../public/assets/compsigh-logo.png', import.meta.url))
    .then((res) => res.arrayBuffer())

  const noise = await fetch(
    new URL('../../../public/og/noise.png', import.meta.url))
    .then((res) => res.arrayBuffer())

  const DelkoRegular = await fetch(
    new URL('../../../public/fonts/Delko-Regular.otf', import.meta.url))
    .then((res) => res.arrayBuffer())

  const TronicaMono = await fetch(
    new URL('../../../public/fonts/TronicaMono.otf', import.meta.url))
    .then((res) => res.arrayBuffer())

  const iAWriterQuattroRegular = await fetch(
    new URL('../../../public/fonts/iAWriterQuattroS-Regular.ttf', import.meta.url))
    .then((res) => res.arrayBuffer())

  const iAWriterQuattroBold = await fetch(
    new URL('../../../public/fonts/iAWriterQuattroS-Bold.ttf', import.meta.url))
    .then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      // Container
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 32,
          background: 'hsla(038deg, 010%, 002%, 1.0)'
        }}
      >

        {/* Noise */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={noise as any}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.8
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'flex-end',
            marginRight: 118,
            gap: 16
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={40}
            height={40}
            src={compsighLogo as any}
            alt=""
          />
          <div
            style={{
              fontFamily: '"Delko"',
              fontSize: 30,
              lineHeight: '180%',
              color: 'hsla(038deg, 100%, 050%, 1.0)',
              textShadow: '0px 0px 10px hsla(038deg, 100%, 050%, 0.6)'
            }}
          >
            compsigh
          </div>
        </div>

        {/* Authors */}
        <div style={{ display: 'flex', gap: 16, marginLeft: 118, maxWidth: 960, flexWrap: 'wrap' }}>
          {authors && authors.map((author, index) => (
            // Author
            <span
              key={index}
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}
            >
              {/* Author > Avatar */}
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_57_133)">
                    <rect
                      x="11"
                      y="11"
                      width="38"
                      height="38"
                      rx="4"
                      stroke="#FAA100"
                      strokeOpacity="0.6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="6 30"
                      strokeDashoffset="130%"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_57_133"
                      x="0"
                      y="0"
                      width="60"
                      height="60"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="5" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.980392 0 0 0 0 0.631373 0 0 0 0 0 0 0 0 0.6 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_57_133"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_57_133"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  style={{
                    position: 'absolute',
                    borderRadius: '4px',
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                  src={author.avatar}
                  alt={author.name}
                  width={30}
                  height={30}
                />
              </span>
              {/* Author > Name */}
              <span style={{ display: 'flex' }}>
                <span style={{
                  fontFamily: '"iA Writer Quattro Bold"',
                  fontSize: 20,
                  color: 'hsla(038deg, 100%, 090%, 0.5)',
                  letterSpacing: '-0.02em',
                  textTransform: 'lowercase',
                  textShadow: '0 0 10px hsla(038deg, 100%, 050%, 0.6)'
                }}>@</span>
                <span style={{
                  fontFamily: '"iA Writer Quattro Bold"',
                  fontSize: 20,
                  color: 'hsla(038deg, 100%, 090%, 1.0)',
                  letterSpacing: '-0.02em',
                  textTransform: 'lowercase',
                  textShadow: '0 0 10px hsla(038deg, 100%, 050%, 0.6)'
                }}>
                  {author.name}
                </span>
              </span>
            </span>
          ))}
        </div>

        {/* Title */}
        <div style={{ display: 'flex', marginLeft: 118 }}>
          <div
            style={{
              maxWidth: 960,
              fontFamily: '"Tronica Mono"',
              fontSize: 80,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'hsla(038deg, 100%, 050%, 1.0)',
              textShadow: '0px 0px 10px hsla(038deg, 100%, 050%, 0.6)'
            }}
          >
            {title}
        </div>
      </div>

      {/* Description */}
      <div style={{ display: 'flex', marginLeft: 118 }}>
        <div
          style={{
            maxWidth: 960,
            fontFamily: '"iA Writer Quattro"',
            fontSize: 24,
            lineHeight: '180%',
            color: 'hsla(038deg, 100%, 090%, 1.0)',
          }}
        >
          {description}
        </div>
      </div>
    </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'iA Writer Quattro',
          data: iAWriterQuattroRegular,
          style: 'normal'
        },
        {
          name: 'iA Writer Quattro Bold',
          data: iAWriterQuattroBold,
          style: 'normal'
        },
        {
          name: 'Delko',
          data: DelkoRegular,
          style: 'normal'
        },
        {
          name: 'Tronica Mono',
          data: TronicaMono,
          style: 'normal'
        }
      ]
    }
  )
}
