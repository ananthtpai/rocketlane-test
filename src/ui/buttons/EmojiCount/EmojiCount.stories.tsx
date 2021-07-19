import React from 'react'
import { action } from '@storybook/addon-actions'

import EmojiCount from '.'

export default {
  title: 'UI/Buttons/EmojiCount',
  component: EmojiCount
}

export const Normal = () => (
  <EmojiCount
    emoji={'👍'}
    count={1}
  />
)

export const Highlighted = () => (
  <EmojiCount
    emoji={'❤️'}
    count={1}
    highlight={true}
  />
)