import { ChevronLeftIcon } from '@heroicons/react/outline'
import { motion, Variants } from 'framer-motion'
import Link, { LinkProps } from 'next/link'
import Colors from 'tailwindcss/colors'

type BackProps = LinkProps

const circle: Variants = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  hover: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: 'spring', duration: 2.0, bounce: 0 },
      opacity: { duration: 1.75 },
    },
  },
}

export const Back = ({ href }: BackProps) => {
  return (
    <motion.div
      className="relative h-12 w-12"
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="z-10 flex h-12 w-12 items-center justify-center">
        <Link
          href={href}
          className="flex h-12 w-12 items-center justify-center"
          onDragStart={(e) => e.preventDefault()}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Link>
      </div>
      <motion.svg className="absolute z-0 h-12 w-12" viewBox="-25 -25 400 400">
        <motion.circle
          variants={circle}
          stroke={Colors.amber['500']}
          cx="175"
          cy="175"
          r="175"
          strokeWidth={10}
          fill="none"
        />
      </motion.svg>
    </motion.div>
  )
}
