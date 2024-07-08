import Image from 'next/image'

import styles from './Author.module.css'

export function Author({ name, avatar }: { name: string, avatar: string }) {
  return (
    <>
      <span className={styles.wrapper}>
        <span className={styles.container}>
          <span className={styles["image-container"]}>
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
            <Image
              unoptimized
              id={styles.avatar}
              src={avatar}
              alt={name}
              width={30}
              height={30}
            />
          </span>
          <span className={styles.name}>{name}</span>
        </span>
      </span>
    </>
  )
}
