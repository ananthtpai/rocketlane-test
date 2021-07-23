import React from 'react'
import { action } from '@storybook/addon-actions'

import EmojiCount from '.'

export default {
  title: 'UI/Buttons/EmojiCount',
  component: EmojiCount,
  decorators: [(Story: React.ElementType) => (
    <div style={{margin: '40px'}}>
      <Story />
    </div>
  )]
}

export const Normal = () => (
  <EmojiCount
    emoji={'👍'}
    count={5}
  />
)

export const Highlighted = () => (
  <EmojiCount
    emoji={'❤️'}
    count={1}
    highlight={true}
  />
)