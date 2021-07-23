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
    reaction={{
      id: 1,
      emoji: '👍',
      name: 'Like'
    }}
    count={5}
  />
)

export const Highlighted = () => (
  <EmojiCount
    reaction={{
      id: 1,
      emoji: '👍',
      name: 'Like'
    }}
    count={1}
    highlight={true}
    onReactionClick={async () => {
      action('on toggle')
      return true
    }}
  />
)