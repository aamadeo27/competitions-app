import classNames from 'classnames'

type Props = {
  children: React.ReactNode
  padding?: string
}

export default function Header({ children, padding='py-2 pl-12 pr-12' }: Props) {
  const classes = classNames(
    padding,
    'backdrop-blur-md text-[40px] text-white font-semibold font-main bg-black/60 rounded-full w-fit'
  )
  return (
    <h1 className={classes}>
      {children}
    </h1>
  )
}