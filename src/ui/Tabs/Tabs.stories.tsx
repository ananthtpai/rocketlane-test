import { action } from '@storybook/addon-actions'
import React, { useState } from 'react'
import styled from 'styled-components'
import Tabs, { TabPane } from '.'

export default {
  title: 'UI/Tabs',
  component: Tabs
}

export const Normal = () => {
  const [ activeTabKey, setActiveTabKey ] = useState('all')

  const handleTabChange = (tabKey: string) => {
    setActiveTabKey(tabKey)
  }

  return <Tabs activeKey={activeTabKey} onChange={handleTabChange} >
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
}