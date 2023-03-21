import classNames from 'classnames'

type Props = {
  children: React.ReactNode
  sizeClasses?: string
}
export default function Container({ children, sizeClasses = 'mr-5' }: Props) {
  const classes = classNames(
    sizeClasses,
    'rounded-2xl mt-10 h-fit p-5 bg-black/80 mb-20'
  )
  return <div className={classes}>{children}</div>
}
