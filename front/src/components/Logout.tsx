import { useUser } from '../logic/client'
import { PowerIcon } from '@heroicons/react/20/solid'
import { urls } from '../logic/constants'

export default function Logout(){
  const ctx = useUser()

  if (! ctx?.user) return <span>Loading</span>

  return (
    <div className='absolute z-20 right-10 m-4 py-1 pl-4 pr-10 w-fit h-fit bg-gray-800/40 text-white rounded-full'>
      <a
        href={urls.logout}
        className='block'
      >
        <PowerIcon className='inline-block mx-2 my-2 fill-white h-5 w-5'/>
        Log out
      </a>
    </div>
  )
}