import Link from 'next/link'

function HeaderNavButton ({title, quickLinks}) {

  return (
    <div className="pl-3 pr-3 text-2xl text-white">
      <Link href={quickLinks[title]}>{title}</Link>
    </div>
  )
}

export default HeaderNavButton
