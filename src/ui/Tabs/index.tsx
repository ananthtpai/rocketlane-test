import React, { ReactElement } from 'react'
import styled from 'styled-components'

interface TabPaneProps {
  tab: ReactElement | string,
  tabKey: string
}

export const TabPane:React.FC<TabPaneProps> = ({children}) => {
  return <div>
    {children}
  </div> 
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 100%;

  * {
    font-size: 14px;
  }
`

const TabNamesList = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 0;
  margin: 0;
  height: 40px;
`

interface TabNamesListItemProps {
  active: boolean
}

const TabNamesListItem = styled.li<TabNamesListItemProps>`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 100%;
  border-bottom: 2px solid ${props => props.active ? '#0f62fe': '#e0e0e0'};
  cursor: pointer;
  line-height: 1.2;
  height: 40px;
`

const TabContent = styled.div`
  max-height: 100%;
  overflow: auto;
  margin: 4px 0;
`
interface Props {
  children: ReactElement<TabPaneProps>[],
  activeKey: string,
  onChange: (tabKey: string) => void
}

export const Tabs:React.FC<Props> = ({children, activeKey, onChange}) => {

  const handleOnTabClick = (tabKey: string) => {
    onChange(tabKey)
  }

  const activeTab = children.find((item, index) => item.props.tabKey === activeKey)
  return (
    <Container>
      <TabNamesList>
        {
          children.map((item, index) => {
            return <TabNamesListItem 
              key={index} 
              active={item.props.tabKey === activeKey}
              onClick={handleOnTabClick.bind(this, item.props.tabKey)}
            >
                {item.props.tab}
            </TabNamesListItem>
          })
        }
      </TabNamesList>
      <TabContent>
        {
          activeTab
        }
      </TabContent>
    </Container>
  )
}

export default Tabs