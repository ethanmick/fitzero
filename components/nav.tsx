type Props = {
  left?: React.ReactNode
  right?: React.ReactNode
  title: string
}

export const Navigation = ({ left, title, right }: Props) => (
  <nav className="grid grid-cols-12">
    <div className="col-span-2">{left}</div>
    <div className="col-span-8 text-center font-semibold">{title}</div>
    <div className="col-span-2">{right}</div>
  </nav>
)
