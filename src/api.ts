import axios, { AxiosResponse } from 'axios'

//TODO: move types to a single file
import { EmojiData } from './ui/buttons/Emoji'

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface UserContentReaction {
  id: number;
  user_id: number;
  reaction_id: number;
  content_id: number;
}

export interface UserContentReactionDetail extends UserContentReaction {
  user?: User,
  reaction?: EmojiData
}

interface AxiosFunc<T> {
  (apiRoot: string): Promise<AxiosResponse<T>>
}

interface UserContentParams {
  user_id?: number, 
  reaction_id?: number, 
  content_id?: number
}

class RocketlaneAPI {
  private endpoint = 'https://artful-iudex.herokuapp.com'
  private fallbackEndpoint = 'https://my-json-server.typicode.com/artfuldev/json-db-data'

  private async withFallBack<T>(func: AxiosFunc<T>) {
    try {
      const response = await func.call(this, this.endpoint)
      return response
    } catch (error) {
      console.log('failed with primary endpoint, trying with fallback')
      try {
        const fallbackResponse = await func.call(this, this.fallbackEndpoint)
        return fallbackResponse
      } catch (error2) {
        console.log('failed with secondary endpoint')
        throw new Error('failed to fetch data')
      }
    }
  }

  getUsers = () => this.withFallBack<User[]>((apiRoot: string) => axios.get(`${apiRoot}/users`))
  getReactions = () => this.withFallBack<EmojiData[]>((apiRoot: string) => axios.get(`${apiRoot}/reactions`))
  getUserContentReactions = (params: UserContentParams) => this.withFallBack<UserContentReaction[]>((apiRoot: string) => axios.get(`${apiRoot}/user_content_reactions`, {
    params
  }))
  saveUserContentReaction = () => axios.post(`/user_content_reactions`)
  deleteUserContentReaction = (id: number) => this.withFallBack(() => axios.delete(`/user_content_reactions/${id}`))
}

export default RocketlaneAPI