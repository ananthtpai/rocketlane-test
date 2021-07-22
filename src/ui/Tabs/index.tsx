import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

interface TabPaneProps {
  tab: string,
  tabKey: string
}

export const TabPane:React.FC<TabPaneProps> = ({tabKey, tab, children}) => {
  return <div style={{padding: '0 16px', lineHeight: 1.2}}>
    {children}
  </div> 
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  * {
    font-size: 14px;
  }
`

const TabNamesList = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  height: 40px;
  border-bottom: 1px solid #e0e0e0;
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
      <div>
        {
          activeTab
        }
      </div>
    </Container>
  )
}

export default Tabs