import cx from 'classnames'
import { forwardRef } from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type Props = InputProps & {
  label: string
}

export const FormInput = forwardRef<any, Props>(function FormInput(
  { label, className, name, ...rest },
  ref
) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        ref={ref}
        className={cx('w-full border bg-gray-700', className)}
        {...rest}
      />
    </div>
  )
})
