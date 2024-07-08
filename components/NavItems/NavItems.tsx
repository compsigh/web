import Link from 'next/link'

export function NavItems() {
  return (
    <>
      <ul>
        <li>
          <Link href={`https://discord.compsigh.club`}>Discord</Link>
        </li>
        <li>
          <Link href={`https://instagram.com/compsigh_`}>Instagram</Link>
        </li>
      </ul>
    </>
  )
}
