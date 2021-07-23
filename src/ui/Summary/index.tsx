import React, { ReactElement } from 'react'
import styled from 'styled-components'

// components
import Tabs, { TabPane } from 'ui/Tabs'
import UserReaction  from 'ui/UserReaction'

//types
import { UserContentReaction, UserContentReactionDetail } from 'types'
import { useState } from 'react'

const Container = styled.div`
  border: 1px solid #e0e0e0;
  padding: 16px 0;
  height: 300px;
  min-width: 270px;
`

const Title = styled.div`
  padding: 0 16px;
`

interface Props {
  title: ReactElement | string,
  userReactions: UserContentReactionDetail[]
}


// move to helper
const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>
)

export const Summary:React.FC<Props> = ({title, userReactions}) => {
  const [ activeTab, setActiveTab ] = useState('all')
  
  const handleOnTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const renderUserReactions = (reactions: UserContentReactionDetail[]) => {
    return reactions.map(({user, reaction}, index) => {
      if (user && reaction) {
        return <UserReaction user={user} reaction={reaction} key={index} />
      } else {
        return null
      }
    })
  }

  const renderTabs = () => {
    const reactionGroups = groupBy(userReactions, item => item.reaction_id.toString())
    const allTab = (<TabPane tab={<b>All</b>} tabKey='all' key='all'>
        { renderUserReactions(userReactions)}
      </TabPane>
    )
    const otherTabs = Object.keys(reactionGroups).map((reactionId, index) => {
      const reactions = reactionGroups[reactionId]
      const tabTitle = `${reactions[0].reaction?.emoji} • ${reactions.length}`
      return <TabPane tab={tabTitle} tabKey={reactionId} key={index}>
       { renderUserReactions(reactions) }
      </TabPane>
    })
    return [ allTab, ...otherTabs ]
  }

  return (
    <Container>
      <Title>{title}</Title>
      {
        userReactions.length > 0 &&
        <Tabs activeKey={activeTab} onChange={handleOnTabChange}>
          {renderTabs()}
        </Tabs>
      }
    </Container>
  )
}

export default Summary