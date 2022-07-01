import { XCircleIcon } from '@heroicons/react/outline'
import cx from 'classnames'

type Props = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const ErrorAlert = ({ className, children }: Props) => {
  return (
    <div className={cx('rounded-md bg-red-50 p-4', className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">{children}</div>
      </div>
    </div>
  )
}
