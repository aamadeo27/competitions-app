export class ApiError extends Error {
  public type: string

  constructor(message: string, original?: any, type?: string) {
    super(message)
    this.cause = original
    this.type = type ?? original.constructor.name
    this.name = 'ApiError'
  }
}

export class RestClient {
  public get = async (url: string, options?: any) => {
    let text
    try {
      console.debug('Getting')

      const response = await fetch(url, {
        credentials: 'include',
        ...options,
      })

      console.debug(response)

      if (response.status === 401) {
        throw new ApiError('Invalid JSON Web Token', undefined, 'Unauthorized')
      } else if (response.status >= 400 && response.status < 500) {
        throw new ApiError('Bad Request', undefined, response.statusText)
      } else if (response.status >= 500) {
        throw new ApiError('Server error', undefined, response.statusText)
      }

      text = await response.text()
    } catch (error) {
      if (error instanceof ApiError) throw error
      throw new ApiError(`Network error GET::${url}`, error)
    }

    try {
      const data = JSON.parse(text)

      return data
    } catch (error) {
      console.error('Response is not JSON: ', text)

      throw new ApiError('Response is not JSON : ' + text)
    }
  }
}
