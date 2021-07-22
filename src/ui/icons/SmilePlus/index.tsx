import React from 'react'
import styled from 'styled-components'

import SmileSvg from './assets/smile.svg'
import PlusSvg from './assets/plus.svg'

const Container = styled.div`
  position: relative;
  max-width: 100px;
`

const PlusIcon = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 33%;
  background: white;
  border-radius: 50%;
`

interface Props {
  /** width in pxs of the Icon max width is 100px, if width is not provided it fits to the width of the container*/
  width?: number
}

export const SmileIcon:React.FC<Props> = ({width}) => {
  return <Container style={{width: `${width}px`}}>
    <img src={SmileSvg} alt='smile' />
    <PlusIcon src={PlusSvg} />
  </Container>
}

export default SmileIcon