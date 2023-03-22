import classNames from 'classnames'

export default function Loading({ className }: { className?: string }) {
  const classes = classNames(
    'mx-auto mt-20 p-10 bg-black/50 w-96 h-96 text-white',
    'flex flex-col text-center rounded-full',
    className
  )

  return (
    <div className={classes}>
      <span className="text-3xl font-bold">Loading...</span>
      <span className="text-sm">wololoooo ♫</span>
      <img src="/img/loading.gif" alt="" />
    </div>
  )
}
