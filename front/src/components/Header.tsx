type Props = {
  children: React.ReactNode
}

export default function Header({ children }: Props) {
  return (
    <h1 className='py-2 px-12 text-[40px] text-white font-semibold font-main bg-black/80 rounded-full w-fit'>
      {children}
    </h1>
  )
}