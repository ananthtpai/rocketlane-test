import React from 'react'
import styled from 'styled-components'

//components
import Tooltip from '../../Tooltip'

const Container = styled.button`
  padding: 0 8px;
  border: none;
  background: none;
`
const Emoji = styled.div`
  &:hover {
    transform: scale(2);
    transform-origin: bottom;
  }
`
export type EmojiData = {
  title: string,
  text: string
}

interface Props extends EmojiData {
  onEmojiClick: (emoji: string) => void
}

export const EmojiButton:React.FC<Props> = ({title, text, onEmojiClick}) => {

  const handleEmojiClick = () => {
    onEmojiClick(text)
  }

  return <Container>
    <Tooltip text={title}>
      <Emoji onClick={handleEmojiClick}>{text}</Emoji>
    </Tooltip>
  </Container>
}

export default EmojiButton
