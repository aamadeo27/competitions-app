import { Route, BrowserRouter, Routes } from 'react-router-dom'
import MenuBar from './components/MenuBar'
import Calendar from './views/Calendar'
import CurrentMatch from './views/CurrentMatch'
import './App.css'
import Login from './views/Login'
import Profile from './views/Profile'
import { ApiWrapper } from './logic/client'
import ProfileDropdown from './components/ProfileDropdown'
import Competitions from './views/Competitions'
import CompetitionPage from './views/Competitions/CompetitionPage'
import { ModalWrapper } from './modals/modals'
import { ApolloSandbox } from '@apollo/sandbox/react'

function getContentRoute(page: React.ReactNode, path: string ) {
  const element = 
    <ApiWrapper loading={null}>
      <ModalWrapper>
        <div className='grid grid-cols-4 bg-gray-300 f-fit pb-10 min-h-[100vh] w-[1400px] rounded-b-3xl'>
          <div className='absolute z-0 w-full h-96 overflow-hidden'>
            <img 
              src='/img/banner.png'
              className='w-fit'
            />
          </div>
          <ProfileDropdown />
          <MenuBar />
          <div className='col-span-3 z-10'>
            {page}
          </div>
        </div>
      </ModalWrapper>
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
              <Route path='/profile'>
                {getContentRoute(<Profile />, '/profile/:id')}
              </Route>
              {getContentRoute(<Calendar />, '/calendar')}
              {getContentRoute(<CurrentMatch />, '/match')}
              <Route path='/divisions'>
                {getContentRoute(<Competitions />, '/divisions')}
                {getContentRoute(<CompetitionPage />, '/divisions/:id')}
              </Route>
              {getContentRoute(<CurrentMatch />, '/configurations')}
              <Route path='/sandbox' element={
                <ApolloSandbox
                  initialEndpoint='http://localhost:3000/graphql'
                  includeCookies={true}
                  className='h-full'
                />} 
              />
            </Routes>
          </div>            
        </BrowserRouter>
      </div>
    </div>
  )
}