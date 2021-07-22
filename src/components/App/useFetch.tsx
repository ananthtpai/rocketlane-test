import { useState, useEffect } from 'react'

//apis
import RocketlaneAPI from 'api'

//types
import { User, UserContentReactionDetail, Reaction } from 'types'

const rocketLaneAPI = new RocketlaneAPI()
const CURRENT_USERID = 4
const fetchUsers = async () => {
  const response = await rocketLaneAPI.getUsers()
  const users = response.data
  return users
}

const fetchReactions = async () => {
  const response = await rocketLaneAPI.getReactions()
  const reactions = response.data
  return reactions
}

const fetchUserContentReactions = async (contentId: number) => {
  const response = await rocketLaneAPI.getUserContentReactions({
    content_id: contentId
  })
  const userReactions = response.data
  return userReactions
  // console.log(groupBy(userReactions, i => i.reaction_id))
  // console.log({userReactions})
}

const useFetch = (contentId: number) => {
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState<Error>()
  const [ reactions, setReactions ] = useState<Reaction[]>([])
  const [ users, setUsers ] = useState<User[]>()
  const [ userReactions, setUserReactions] = useState<UserContentReactionDetail[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [users, reactions] = await Promise.all([fetchUsers(), fetchReactions()])
        setUsers(users)
        setReactions(reactions)
  
        const userReactions = await fetchUserContentReactions(contentId)
        const userReactionsDetails = userReactions.map((userReaction, index) => {
          const details: UserContentReactionDetail = {...userReaction }
          details['user'] = users.find((user) => user.id === userReaction.user_id)
          details['reaction'] = reactions.find((reaction) => reaction.id === userReaction.reaction_id)
          return details
        })
  
        setUserReactions(userReactionsDetails)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [contentId])
  
  return { loading, error, reactions, users, userReactions}
}

export default useFetch