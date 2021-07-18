import React, { useState } from 'react'

import Tooltip from '.'

export default {
  title: 'UI/Tooltip',
  component: Tooltip
}

export const Normal = () => (
  <Tooltip text={'Like'}>
    <div>Test</div>
  </Tooltip>
)