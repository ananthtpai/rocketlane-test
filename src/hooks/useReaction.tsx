import { useState, useEffect } from 'react'

//apis
import RocketlaneAPI from 'api'

//types
import { User, UserContentReactionDetail, Reaction } from 'types'

const rocketLaneAPI = new RocketlaneAPI()
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
}

const saveUserContentReaction = async (user_id: number, reaction_id: number, content_id: number) => {
  const response = await rocketLaneAPI.saveUserContentReaction({user_id, reaction_id, content_id})
  return response.data
}

const deleteUserContentReaction = async (userContentReactionId: number) => {
  const response = await rocketLaneAPI.deleteUserContentReaction(userContentReactionId)
  console.log(response.data)
  return response.data
}

const useReaction = (contentId: number) => {
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState<Error>()
  const [ reactions, setReactions ] = useState<Reaction[]>([])
  const [ users, setUsers ] = useState<User[]>([])
  const [ userReactions, setUserReactions] = useState<UserContentReactionDetail[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [users, reactions] = await Promise.all([fetchUsers(), fetchReactions()])
        setUsers(users)
        setReactions(reactions)
  
        const userReactions = await fetchUserContentReactions(contentId)
        const userReactionsDetails:UserContentReactionDetail[] = []
        userReactions.forEach((userReaction, index) => {
          const user = users.find((user) => user.id === userReaction.user_id)
          const reaction = reactions.find((reaction) => reaction.id === userReaction.reaction_id)
          if (user && reaction) {
            const details: UserContentReactionDetail = {
              ...userReaction,
              user,
              reaction
            }
            userReactionsDetails.push(details)
          } 
        })
        setUserReactions(userReactionsDetails)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  },[contentId])

  const getUserReactionForReactionId = (userId: number, reactionId: number) => {
    return userReactions.find((item, index) => item.reaction_id === reactionId && item.user_id === userId)
  }

  const getUserReactionForReactionIdIndex = (userId: number, reactionId: number) => {
    return userReactions.findIndex((item, index) => item.reaction_id === reactionId && item.user_id === userId)
  }

  const toggleUserReaction = async (userId: number, reaction: Reaction) => {
    const index = getUserReactionForReactionIdIndex(userId, reaction.id)
    if (index !== -1) {
      const userContentReactionItem = userReactions[index]
      userReactions.splice(index, 1)
      setUserReactions([...userReactions])
      try {
        await deleteUserContentReaction(userContentReactionItem.id)
        return true
      } catch (error) {
        //TODO: revert soft delete
        return false
      }
    } else {
      try {
        const newUserReaction = await saveUserContentReaction(userId, reaction.id, contentId)
        const user = users.find((user) => user.id === userId)
        if (user && reaction) {
          userReactions.push({
            ...newUserReaction,
            user,
            reaction
          })
          setUserReactions([...userReactions])
        }
        return true
      } catch (error) {
        
        return false
      }
    }
  }
  
  return { loading, error, reactions, users, userReactions, toggleUserReaction, getUserReactionForReactionId}
}

export default useReaction