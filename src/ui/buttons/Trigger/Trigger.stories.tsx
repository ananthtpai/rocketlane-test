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
      { text: '👍', title: 'Like'} , 
      { text: '❤️', title: 'Love'} , 
      { text: '👏', title: 'Clap'}
    ]}
  />
)