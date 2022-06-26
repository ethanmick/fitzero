import { ArrowLeftIcon } from '@heroicons/react/outline'
import Link, { LinkProps } from 'next/link'

type BackProps = LinkProps

export const Back = ({ href }: BackProps) => (
  <Link href={href}>
    <a>
      <ArrowLeftIcon className="w-5 h-5" />
    </a>
  </Link>
)
