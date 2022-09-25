import { EntityRepository } from 'typeorm'
import { HttpException } from '@exceptions/HttpException'
import { isEmpty } from '@utils/util'
import { request } from '@utils/request'
import { auth } from '@config'

const urls = {
  playerSummaries: id => `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${auth.steam.apiKey}&steamids=${id}`,
}

export type SteamInfo = {
  avatar: string
  name: string
}

@EntityRepository()
export default class SteamApi {
  public async getSteamInfo(steamId: string): Promise<SteamInfo> {
    if (isEmpty(steamId)) throw new HttpException(400, "User doesn't have steamId")

    const { response } = await request(urls.playerSummaries(steamId), undefined, true)

    const steamInfo = {
      avatar: response.players[0].avatarfull,
      name: response.players[0].personaname,
    }

    return steamInfo
  }
}
