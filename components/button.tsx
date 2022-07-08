import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/outline'
import cx from 'classnames'
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
      <motion.svg
        className="absolute top-0 -z-10 h-12 w-12"
        viewBox="-25 -25 400 400"
      >
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
      <Link
        href={href}
        className="z-50 flex h-12 w-12 items-center justify-center"
        onDragStart={(e) => e.preventDefault()}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </Link>
    </motion.div>
  )
}

type AddProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const Add = ({ className, ...rest }: AddProps) => {
  return (
    <Link
      className={cx('flex h-12 w-12 items-center justify-center', className)}
      {...rest}
    >
      <PlusIcon className="h-5 w-5" />
    </Link>
  )
}
