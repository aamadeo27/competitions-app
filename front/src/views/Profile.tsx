import Header from '../components/Header'
import SteamIcon from '../components/icons/SteamIcon'
import { useUser } from '../logic/client'

export default function Profile() {
  const ctx = useUser()

  if (! ctx?.user) return <span>Loading</span>

  const steamUrl = `https://steamcommunity.com/profiles/${ctx.user.id}`
  // eslint-disable-next-line max-len
  const flag = `https://community.akamai.steamstatic.com/public/images/countryflags/${ctx.user.country}.gif`

  return (
    <div className='mt-36 mr-16 h-24'>
      <Header>
        {ctx.user.name}
      </Header>
      
      <div className='rounded-3xl bg-white w-full h-fit my-6 p-8'>
        <img
          className='rounded-full bg-gradient-to-br from-slate-900 to-blue-500 h-36 w-36 p-1'
          src={ctx.user.avatar}
        />

        <div className='mt-4 bg-gray-300 w-96 h-32 rounded-2xl p-4'>
          <img
            className='h-5 w-8 inline-block mx-2'
            src={flag}
          />
          <a 
            className='font-main text-base font-semibold text-gray-500 block m-2'
            href={steamUrl}
          >
            <SteamIcon className='inline-block mx-2 fill-steam stroke-steam'/>
            <span>STEAM ACCOUNT</span>
          </a>
          <div className='block text-gray-600 p-1'>
            <div>
              <span> Real Name: </span>
              <span className='text-gray-600'>{ctx.user.realname}</span>
            </div>
            <div>
              <span> Steam Profile Id: </span>
              <span className='text-gray-600'>{ctx.user.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}