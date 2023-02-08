import React, { createContext, useContext, useEffect, useState } from 'react'
import { urls } from './constants'
import { ApiError, RestClient } from './rest'
import { User } from './types'

export const ClientContext = createContext<RestClient|null>(null)
export const useClient = () => useContext(ClientContext)

export const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [client] = useState(new RestClient())

  return (
    <ClientContext.Provider value={client}>
      {children}
    </ClientContext.Provider>
  )
}

export const UserContext = createContext<{ user: User, setUser: (u:User) => void }|null>(null)
export const useUser = () => useContext(UserContext)

type Props = { children: React.ReactNode, loading: React.ReactNode }
export const UserWrapper = ({ children, loading }: Props) => {
  const client = useClient()
  const [user, setUser] = useState<User>(null)
  const [fetching, setFetching] = useState(true)

  const refresh = () => client?.get(
    `${urls.profileData}?${new Date().getTimezoneOffset()}`
  ).then( data => {
    const { id, displayName: name, photos, realname } = data
    setUser({
      id,
      name,
      avatar: photos[2].value,
      realname,
      country: data.loccountrycode?.toLowerCase()
    })
  }).catch( error => {
    if ( error instanceof ApiError ){
      if ( error.type !== 'Unauthorized') console.error(`ApiError, ${error.type}: ${error.message}`)
      if ( location.pathname !== '/login' ) location.href = '/login'
    } else {
      console.error('Error in Client', error)
    }
    
  }).finally(() => {
    setFetching(false)
  })

  useEffect( () => {
    refresh()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {fetching ? loading : children}
    </UserContext.Provider>
  )
}

export const ApiWrapper = ({ children, loading }: Props) => {
  return (
    <ClientWrapper>
      <UserWrapper loading={loading}>
        {children}
      </UserWrapper>
    </ClientWrapper>
  )
}