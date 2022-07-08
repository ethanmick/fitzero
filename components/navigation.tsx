type Props = {
  left?: React.ReactNode
  right?: React.ReactNode
  children?: React.ReactNode
}

export const Navigation = ({ left, children, right }: Props) => (
  <nav className="sticky top-0 grid grid-cols-12 bg-neutral-900 py-4 shadow">
    <div className="col-span-2 flex items-center justify-start">{left}</div>
    <div className="col-span-8 flex items-center justify-center text-2xl font-semibold">
      {children}
    </div>
    <div className="col-span-2 flex items-center justify-end">{right}</div>
  </nav>
)
