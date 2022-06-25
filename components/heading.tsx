import cx from 'classnames'

type PageTitleProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

export const PageTitle = ({ className, ...rest }: PageTitleProps) => (
  <h1 className={cx('py-16 font-semibold text-3xl')} {...rest} />
)
