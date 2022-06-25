import cx from 'classnames'

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>

export const Main = ({ className, ...rest }: Props) => (
  <main className={cx('px-8', className)} {...rest} />
)
