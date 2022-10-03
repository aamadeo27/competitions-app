import UserService from '@/services/users.service'

const steamInfo = {
  name: 'Test User',
  avatar: 'https://localhost/img/logo.png',
}

const userData = {
  steamId: 'steam-id',
  ...steamInfo,
}

jest.mock(
  '../services/steam.service',
  () =>
    class MockSteamService {
      public getSteamInfo = jest.fn(() => steamInfo)
    },
)

const userSvc = new UserService()

describe('UserService', () => {
  it('can conenct a new user', async () => {
    const user = await userSvc.connect(userData)

    // new user
    expect(user).toMatchObject(userData)

    // existingUser
    const sameUser = await userSvc.connect(userData)
    expect(user).toMatchObject(sameUser)
  })
})
