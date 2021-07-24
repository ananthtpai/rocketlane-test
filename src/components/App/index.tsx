import styled from 'styled-components'

//components
import Summary from 'ui/Summary'
import TriggerButton from 'ui/buttons/Trigger'
import EmojiCount from 'ui/buttons/EmojiCount'

//hooks
import useReaction from 'hooks/useReaction'

//helpers
import { groupBy } from 'utils'

//types
import { Reaction } from 'types'

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  > div {
    margin: 0 8px;
  }
`

function getContentId() {
  let searchParams = new URLSearchParams(window.location.search)
  return parseInt(searchParams.get('content_id') || '1')
}

const CURRENT_USERID = 4

const App = () => {
  const { loading, error, reactions, userReactions, toggleUserReaction, getUserReactionForReactionId } = useReaction(getContentId())

  const handleOnEmojiClicked = (reaction: Reaction) => {
    return toggleUserReaction(CURRENT_USERID, reaction)
  }

  
  if (loading) {
    return <Container>Loading</Container>
  }
  if (error) {
    return <Container>{error.message}</Container>
  }

  const groupedReactions = groupBy(userReactions, item => item.reaction_id.toString())
  return (
    <Container>
      <Summary 
        title={<b>Reactions</b>}
        userReactions={userReactions}
      />
      {
        reactions.map((reaction, index) => {
          if (!groupedReactions[reaction.id]) {
            return null
          }
          const count = groupedReactions[reaction.id].length
          const currentUserReaction = getUserReactionForReactionId(CURRENT_USERID, reaction.id)
          return <EmojiCount
            key={index}
            reaction={reaction}
            count={count}
            highlight={currentUserReaction && currentUserReaction.reaction_id === reaction.id}
            onReactionClick={handleOnEmojiClicked}
          />
        })
      }
      <TriggerButton 
        emojis={reactions}
        onEmojiClicked={handleOnEmojiClicked}
      />
    </Container>
  )
}

export default App
