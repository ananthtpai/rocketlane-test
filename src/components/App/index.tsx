import styled from 'styled-components'

//components
import Summary from 'ui/Summary'
import TriggerButton from 'ui/buttons/Trigger'
import EmojiCount from 'ui/buttons/EmojiCount'

//hooks
import useFetch from './useFetch'

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

function getContentId() {
  let searchParams = new URLSearchParams(window.location.search)
  return parseInt(searchParams.get('content_id') || '')
}

const App = () => {
  const { loading, error, reactions, users, userReactions } = useFetch(getContentId())

  if (loading) {
    return <div>Loading</div>
  }
  if (error) {
    return <div>{error.message}</div>
  }
  return (
    <Container>
      <Summary 
        title='Reactions'
        userReactions={userReactions}
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
