import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

//components
import SmilePlus from '../../icons/SmilePlus'
import EmojiButton, { EmojiData } from '../Emoji'

interface Props {
  /** input array of emojis */
  emojis: EmojiData[]
}
const Container = styled.div`
  // width: 300px;
  // height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TriggerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`
const AddReaction = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  position: relative;
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
`

export const TriggerButton:React.FC<Props> = ({emojis}) => {
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

  const handleEmojiClick = (emoji: string) => {

  }

  return (
    <Container>
      <TriggerContainer ref={triggerRef}>
        {
          showEmojis &&
          <EmojisList>
            {
              emojis.map((emoji, index) => {
                return <EmojiButton 
                  key={index} 
                  {...emoji}
                  onEmojiClick={handleEmojiClick}
                />
              })
            }
          </EmojisList>
        }
        <AddReaction onClick={handleClick}>
          <SmilePlus />
        </AddReaction>
      </TriggerContainer>
    </Container>
    
  )
}

export default TriggerButton

