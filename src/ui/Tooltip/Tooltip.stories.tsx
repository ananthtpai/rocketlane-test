import React, { useState } from 'react'

import Tooltip from '.'

export default {
  title: 'UI/Tooltip',
  component: Tooltip,
  decorators: [(Story: React.ElementType) => (
    <div style={{margin: '40px'}}>
      <Story />
    </div>
  )]
}

export const Normal = () => (
  <Tooltip text={'Like'}>
    <div>Test</div>
  </Tooltip>
)