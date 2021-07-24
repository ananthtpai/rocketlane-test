import React, { useState } from 'react'
import styled from 'styled-components'

//types
import { Reaction } from 'types'

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
  cursor: ${props => props.highlight && 'pointer'};

  > div {
    padding: 0 4px;
  }
`

interface Props {
  /** Set to true if current user selected this emoji */
  reaction: Reaction,
  count: number,
  highlight?: boolean
  /** Called only if the button is highlighted */
  onReactionClick?: (reaction: Reaction) => Promise<boolean>
}

export const EmojiCount:React.FC<Props> = ({highlight = false, reaction, count, onReactionClick}) => {
  const [ clickEnabled, setClickEnabled ] = useState(true)

  const handleOnClick:React.MouseEventHandler<HTMLDivElement> = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (highlight && onReactionClick) {
      if (clickEnabled) {
        setClickEnabled(false)
        await onReactionClick(reaction)
        setClickEnabled(true)
      }
      return
    }
  }
  return (
    <Container highlight={highlight} onClick={handleOnClick}>
      <div>{reaction.emoji}</div> 
      <div>{count}</div>
    </Container>
  )
}

export default EmojiCount