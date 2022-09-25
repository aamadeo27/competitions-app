import classNames from 'classnames'
import { useEffect } from 'react'
import Button from '../components/Button'
import SteamIcon from '../components/icons/SteamIcon'
import { useUser } from '../logic/client'
import { urls } from '../logic/constants'

const MAIN_CLASSES = classNames(
  'grid grid-cols-2 bg-zinc-200 mx-auto rounded-3xl'
)

export default function Login() {

  const ctx = useUser()
  const user = ctx?.user
  
  useEffect(() => {
    if (user) location.href = '/'
  }, [user])

  const btnLabel =  <>
    <SteamIcon className='inline-block mr-3 fill-white'/>
    <span>Sign in with steam</span>
  </>
  
  return (
    
    <div className={MAIN_CLASSES}>
      <div className='grid grid-cols-6 py-20'>
        <div className='col-start-3 col-span-3 grid grid-rows-3'>
          <span className='text-lg font-logo font-bold '>
              AoE DE Community League
          </span>
          <div className='font-heading'>
            <h1 className='text-2xl font-semibold my-3'>Welcome back</h1>
            <p className='text-zinc-700 my-2 font-normal'>
                Welcome back! Please login with your steam account
            </p>
            <Button href={urls.auth}
              label={btnLabel}
              colorClasses='bg-steam-900 text-white'
              sizeClasses='mt-6 py-3 px-6 w-full'
            />
          </div>
        </div>
      </div>
      <img
        src="/img/bg-sign-in.png"
        className='w-full rounded-r-3xl'
      />
    </div>

  )
}