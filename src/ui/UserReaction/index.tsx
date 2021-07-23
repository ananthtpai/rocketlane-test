import React from 'react'
import styled from 'styled-components'

import { User, Reaction } from 'types'

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  font-weight: 500;
  > div {
    padding: 0 8px;
  }
`

const ImageContainer = styled.div`
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
`
interface Props {
  user: User,
  reaction: Reaction
}

export const UserReaction:React.FC<Props> = ({user, reaction}) => {
  return <Container>
    <ImageContainer><img src={user.avatar} /></ImageContainer>
    <div>{reaction.emoji}</div>
    <div>{user.first_name} {user.last_name}</div>
  </Container>
}

export default UserReaction