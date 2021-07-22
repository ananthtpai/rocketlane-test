import React from 'react'
import styled from 'styled-components'

//components
import Tooltip from '../../Tooltip'

const Container = styled.button`
  padding: 0 8px;
  border: none;
  background: none;
  cursor: pointer;
`

const Emoji = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(2);
    transform-origin: bottom;
  }
`
export interface EmojiData {
  id: number,
  name: string,
  emoji: string
}

interface Props {
  data: EmojiData
  onEmojiClick: (item: EmojiData) => void
}

export const EmojiButton:React.FC<Props> = ({data, onEmojiClick}) => {

  const handleEmojiClick = () => {
    onEmojiClick(data)
  }

  return <Container>
    <Tooltip text={data.name}>
      <Emoji onClick={handleEmojiClick}>{data.emoji}</Emoji>
    </Tooltip>
  </Container>
}

export default EmojiButton
