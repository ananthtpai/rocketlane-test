import React from 'react'
import styled from 'styled-components'

// components
import Tabs, { TabPane } from '../Tabs'

const Container = styled.div`
  border: 1px solid #e0e0e0;
  padding: 16px 0;
  height: 300px;
  width: 270px;
`

const Title = styled.div`
  padding: 0 16px;
  font-weight: bold;
`
interface Props {
  title: string
}

export const Summary:React.FC<Props> = ({title}) => {
  const handleOnTabChange = (activeTab: string) => {

  }
  return (
    <Container>
      <Title>{title}</Title>
      <Tabs activeKey='all' onChange={handleOnTabChange}>
        <TabPane tab='All' tabKey='all'>
          Test All
        </TabPane>
        <TabPane tab={`❤️ · ${1}`} tabKey='❤️'>
          Test ❤️
        </TabPane>
        <TabPane tab={`👍 · ${1}`} tabKey='👍'>
          Test ❤️
        </TabPane>
      </Tabs>
    </Container>
  )
}

export default Summary