import { MenuAlt1Icon } from '@heroicons/react/outline'
import { useState } from 'react'

export const Menu = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-12 w-12 items-center justify-center"
      >
        <MenuAlt1Icon className="h-5 w-5" />
      </button>
    </>
  )
}
