import React, { useState } from 'react'

import UserReaction from '.'


export default {
  title: 'UI/UserReaction',
  component: UserReaction
}

const sampleUser = {
  "id": 1,
  "first_name": "Lizette",
  "last_name": "Phippen",
  "email": "lphippen0@berkeley.edu",
  "avatar": "http://dummyimage.com/128x134.png/dddddd/000000"
}

const sampleReaction = {
  "id": 1,
  "name": "Like",
  "emoji": "👍"
}

export const Normal = () => (
  <UserReaction 
    user={sampleUser}
    reaction={sampleReaction}
  />
)