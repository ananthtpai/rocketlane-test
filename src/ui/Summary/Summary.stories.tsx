import React, { useState } from 'react'

import Summary from '.'


export default {
  title: 'UI/Summary',
  component: Summary
}

export const NormalTitle = () => (
  <Summary 
    title='Reactions' 
    userReactions={[]} 
  />
)

export const TitleAsReactElement = () => (
  <Summary
    title={<b>Reactions</b>}
    userReactions={[]}
  />
)