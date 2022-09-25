import { Route, BrowserRouter, Routes } from 'react-router-dom'
import MenuBar from './components/MenuBar'
import Calendar from './views/Calendar'
import CurrentMatch from './views/CurrentMatch'
import './App.css'
import Login from './views/Login'
import Profile from './views/Profile'
import { ApiWrapper } from './logic/client'
import Logout from './components/Logout'
import Competitions from './views/Competitions'
import CompetitionPage from './views/Competitions/CompetitionPage'

function getContentRoute(page: React.ReactNode, path: string ) {
  const element = 
    <ApiWrapper loading={null}>
      <div className='grid grid-cols-4 bg-gray-300 h-full w-[1400px]'>
        <div className='absolute z-0 w-full h-96 overflow-hidden'>
          <img 
            src='/img/banner.png'
            className='w-fit'
          />
        </div>
        <Logout />
        <MenuBar />
        <div className='col-span-3 z-10'>
          {page}
        </div>
      </div>
    </ApiWrapper>
  return <Route {...{path, element}} />
}

export default function Dashboard() {
  const props = {
    className:'w-full min-h-[1000px] flex pb-10'
  }

  const login = (
    <ApiWrapper loading='Loading'>
      <Login />
    </ApiWrapper>
  )

  return (
    <div>
      <div {...props}>
        <BrowserRouter>
          <div className='mx-auto w-[1400px] relative'>
            <Routes>
              <Route path='/login'
                element={login}/>
              {getContentRoute(<Profile />, '/')}
              {getContentRoute(<Calendar />, '/calendar')}
              {getContentRoute(<CurrentMatch />, '/match')}
              <Route path='/divisions'>
                {getContentRoute(<Competitions />, '/divisions')}
                {getContentRoute(<CompetitionPage />, '/divisions/:id')}
              </Route>
              
              {getContentRoute(<CurrentMatch />, '/configurations')}

            </Routes>
          </div>            
        </BrowserRouter>
      </div>
    </div>
  )
}