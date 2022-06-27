import { ReactElement, ReactNode } from 'react'

type Props = {
  left?: ReactNode
  right?: ReactNode
  children?: ReactElement
}

export const Header = ({ left, right, children }: Props) => (
  <div className="grid grid-cols-8 items-center py-16">
    <span className="col-span-1 flex justify-start h-full">{left}</span>
    <span className="col-span-6">{children}</span>
    <span className="col-span-1 flex justify-end">{right}</span>
  </div>
)
