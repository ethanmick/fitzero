import { MenuAlt3Icon } from '@heroicons/react/outline'
import { useState } from 'react'

export const Menu = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>
        <MenuAlt3Icon className="h-5 w-5" />
      </button>
    </>
  )
}
