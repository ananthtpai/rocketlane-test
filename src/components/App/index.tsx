import React, { useEffect, useState} from 'react'
import styled from 'styled-components'
//apis
import RocketlaneAPI, { User, UserContentReactionDetail } from 'api'

//components
import Summary from 'ui/Summary'
import TriggerButton from 'ui/buttons/Trigger'
import EmojiCount from 'ui/buttons/EmojiCount'

//types
import { EmojiData } from 'ui/buttons/Emoji'

const rocketLaneAPI = new RocketlaneAPI()
const CURRENT_USERID = 4

const Container = styled.div`
  display: flex;
  align-items: center;
  > div {
    margin: 0 8px;
  }
`

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>
)

const App = () => {
  const [ reactions, setReactions ] = useState<EmojiData[]>([])
  const [ users, setUsers ] = useState<User[]>()
  const [ userReactions, setUserReactions] = useState<UserContentReactionDetail[]>([])

  const [ contentId, setContentId ] = useState<number>()
  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.search)
    setContentId(parseInt(searchParams.get('content_id') || ''))
  }, [])

  useEffect(() => {
    if (contentId) {
      Promise.all([fetchUsers(), fetchReactions()])
        .then(async ([users, reactions]) => {
          setUsers(users)
          setReactions(reactions)

          const userReactions = await fetchUserContentReactions()
          const userReactionsDetails = userReactions.map((userReaction, index) => {
            const details: UserContentReactionDetail = {...userReaction }
            details['user'] = users.find((user) => user.id === userReaction.user_id)
            details['reaction'] = reactions.find((reaction) => reaction.id === userReaction.reaction_id)
            return details
          })
          console.log({userReactionsDetails})
        })
      //can be made into a single call
      // fetchCurrentUserContentReactions()
    }
  }, [contentId])

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

  const fetchCurrentUserContentReactions = async () => {
    const response = await rocketLaneAPI.getUserContentReactions({
      content_id: contentId,
      user_id: CURRENT_USERID
    })
    const currentUserReaction = response.data
  }

  const fetchUserContentReactions = async () => {
    const response = await rocketLaneAPI.getUserContentReactions({
      content_id: contentId
    })
    const userReactions = response.data
    return userReactions
    console.log(groupBy(userReactions, i => i.reaction_id))
    console.log({userReactions})
  }
  return (
    <Container>
      <Summary 
        title='Reactions'
      />
      {/* {
        <EmojiCount 
          highlight={false}
          emoji={'👍'}
          count={0}
        />
      } */}
      <TriggerButton 
        emojis={reactions}
        onEmojiClicked={() => {}}
      />
    </Container>
  )
}

export default App
