import Link from 'next/link'
import { UrlObject } from 'url'

type TabProps = {
  name: string
  icon: string
  href: UrlObject
  active?: string
}

type Props = {
  tabs: TabProps[]
}

const Tab = ({ name, icon, active, href }: TabProps) => (
  <Link href={href}>
    <div>{icon}</div>
    <div>{name}</div>
  </Link>
)

export const TabBar = ({ tabs }: Props) => (
  <nav className="">
    {tabs.map((tab) => (
      <Tab {...tab} key={tab.name} />
    ))}
  </nav>
)
