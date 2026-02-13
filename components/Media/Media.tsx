import Link from 'next/link'
import { type Route } from 'next'
import Image, { type ImageProps } from 'next/image'
import { imageSizeFromFile } from 'image-size/fromFile'

import styles from './Media.module.css'

function LinkWrapper({ link, children }: { link?: Route, children: React.ReactNode }) {
  return <>{link ? <Link href={link}>{children}</Link> : children}</>
}

export interface MediaProps extends Omit<ImageProps, 'alt'> {
  title?: string
  description?: React.ReactElement | string
  link?: Route
  cta?: string
  alt?: string
}

export async function Media(
  { title, description, link, cta, alt, ...props }:
  MediaProps
) {
  async function processImage(src: string) {
    const dimensions = imageSizeFromFile(src)
    return dimensions
  }
  let imageData
  const video = props.src.toString().endsWith('.mp4')
  if (!video) imageData = await processImage(`public${props.src}`)
  const isGif = props.src.toString().endsWith('.gif')

  const ImageWrapper = (
    <>
      { !video &&
        <Image
          unoptimized={isGif}
          alt={alt || ''}
          placeholder="empty"
          sizes="(max-width: 860px) 100vw - 80px, 700px"
          width={imageData?.width}
          height={imageData?.height}
          {...props}
        />
      }
    </>
  )

  const VideoWrapper = (
    <>
      {
        video &&
          <video
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={props.src as string} type="video/mp4" />
          </video>
      }
    </>
  )

  return (
    <>
      <div
        id={styles["media-container"]}
        style={props.style}
      >
        <figure>
          <LinkWrapper link={link}>
            {ImageWrapper}
            {VideoWrapper}
            {title && <figcaption>{title}</figcaption>}
          </LinkWrapper>
            {description && <div id={styles.description}>{description}</div>}
            {cta && <p id={styles.cta}><LinkWrapper link={link}>{cta}</LinkWrapper></p>}
        </figure>
      </div>
    </>
  )
}
