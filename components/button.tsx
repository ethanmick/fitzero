import { ArrowLeftIcon } from '@heroicons/react/outline'
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
      className="relative w-12 h-12"
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex absolute w-12 h-12 items-center justify-center z-10">
        <Link
          href={href}
          className="w-12 h-12 flex items-center justify-center"
          onDragStart={(e) => e.preventDefault()}>

          <ArrowLeftIcon className="w-6 h-6" />

        </Link>
      </div>
      <motion.svg className="absolute w-12 h-12 z-0" viewBox="-25 -25 400 400">
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
  );
}
