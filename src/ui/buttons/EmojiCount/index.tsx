import React from 'react'
import styled from 'styled-components'

interface ContainerProps {
  highlight: boolean
}

const Container = styled.div<ContainerProps>`
  height: 32px;
  border-radius: 24px;
  border: 1px solid ${props => props.highlight ? '#0f62fe' : '#e0e0e0'};
  background: ${props => props.highlight ? '#edf5ff' : 'white'};
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    padding: 0 4px;
  }
`

interface Props {
  /** Set to true if current user selected this emoji */
  highlight?: boolean
  emoji: string,
  count: number
}

export const EmojiCount:React.FC<Props> = ({highlight = false, emoji, count}) => {

  return (
    <Container highlight={highlight}>
      <div>{emoji}</div> 
      <div>{count}</div>
    </Container>
  )
}

export default EmojiCount