import { action } from '@storybook/addon-actions'
import React from 'react'
import styled from 'styled-components'
import Trigger from '.'

export default {
  title: 'UI/Buttons/Trigger',
  component: Trigger
}

export const Normal = () => (
  <Trigger
    emojis={[
      { id: 1, emoji: '👍', name: 'Like'} , 
      { id: 2, emoji: '❤️', name: 'Love'} , 
      { id: 3, emoji: '👏', name: 'Clap'}
    ]}
    onEmojiClicked={action('on emoji clicked')}
  />
)