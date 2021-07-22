import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

//components
import SmilePlus from 'ui/icons/SmilePlus'
import EmojiButton from 'ui/buttons/Emoji'

//types
import { Reaction } from 'types'

interface Props {
  /** input array of emojis */
  emojis: Reaction[]
  /** On emoji clicked send item that was clicked */
  onEmojiClicked: (item: Reaction) => void,
  reactions?: {
    emoji: string,
    count: number
  }[]
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`
 
const AddReaction = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
`

const EmojisList = styled.div`
  position: absolute;
  top: calc(-100% - 8px);
  border-radius: 24px;
  height: 32px;
  font-size: 16px;
  display: flex;
  padding: 0 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 3px 10px #e0e0e0;
  background: white;
`

export const TriggerButton:React.FC<Props> = ({emojis, onEmojiClicked}) => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const [ showEmojis, setShowEmojis ] = useState(false)

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleClickOutside:EventListener = (event) => {
    if (triggerRef.current  && !triggerRef.current.contains(event.target as Node)) {
      setShowEmojis(false)
    }
  }

  const handleClick = () => {
    setShowEmojis(!showEmojis)
  }

  const handleEmojiClick = (emoji: Reaction) => {
    onEmojiClicked(emoji)
  }

  return (
    <Container ref={triggerRef}>
      {
        showEmojis &&
        <EmojisList>
          {
            emojis.map((emoji, index) => {
              return <EmojiButton 
                key={index} 
                data={emoji}
                onEmojiClick={handleEmojiClick}
              />
            })
          }
        </EmojisList>
      }
      <AddReaction onClick={handleClick}>
        <SmilePlus />
      </AddReaction>
    </Container>    
  )
}

export default TriggerButton

