import React from 'react'
import { action } from '@storybook/addon-actions'

import EmojiButton from '.'

export default {
  title: 'UI/Buttons/Emoji',
  component: EmojiButton,
  decorators: [(Story: React.ElementType) => (
    <div style={{margin: '40px'}}>
      <Story />
    </div>
  )]
}

export const Normal = () => (
  <EmojiButton
    data={{id: 1, name: 'Like', emoji: '👍'}}
    onEmojiClick={action('on emoji click')}
  />
)