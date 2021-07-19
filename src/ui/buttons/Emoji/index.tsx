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
  &:hover {
    transform: scale(2);
    transform-origin: bottom;
  }
`
export type EmojiData = {
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
