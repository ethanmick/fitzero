type Props = {
  left?: React.ReactNode
  right?: React.ReactNode
  children?: React.ReactNode
}

export const Navigation = ({ left, children, right }: Props) => (
  <nav className="grid grid-cols-12 py-4">
    <div className="col-span-2">{left}</div>
    <div className="col-span-8 flex items-center justify-center text-2xl font-semibold">
      {children}
    </div>
    <div className="col-span-2">{right}</div>
  </nav>
)
