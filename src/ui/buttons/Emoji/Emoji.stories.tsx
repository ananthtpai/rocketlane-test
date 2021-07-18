import React from 'react'
import { action } from '@storybook/addon-actions'

import EmojiButton from '.'

export default {
  title: 'UI/Buttons/Emoji',
  component: EmojiButton
}

export const Normal = () => (
  <EmojiButton
    text={'👍'}
    title={'Like'}
    onEmojiClick={action('on emoji click')}
  />
)