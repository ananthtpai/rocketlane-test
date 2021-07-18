import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const TOOLTIP_BACKGROUND = '#161616'

const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  background: ${TOOLTIP_BACKGROUND};
  border-radius: 2px;
  padding: 12px 16px;
  font-size: 12px;
  color: white;
  display: inline-block;
  position: absolute;
  transform: translateY(calc(-100% - 10px));

  :before {
    content:'';
    position: absolute;
    border-top: 4px solid ${TOOLTIP_BACKGROUND};
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
  }
`

interface Props {
  /** Tooltip text */
  text: string
}

export const Tooltip:React.FC<Props> = ({text, children}) => {
  const [ showTooltip, setShowTooltip ] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleMouseOverOutside:EventListener = (event) => {
    if (tooltipRef.current  && !tooltipRef.current.contains(event.target as Node)) {
      setShowTooltip(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mouseover', handleMouseOverOutside)
    return () => {
      document.removeEventListener('mouseover', handleMouseOverOutside)
    }
  }, [])

  const handleMouseOver:React.MouseEventHandler<HTMLDivElement> = (e) => {
    setShowTooltip(true)
  }
  
  return (
    <Wrapper ref={tooltipRef}>
      {
        showTooltip &&
        <Container>
          {text}
        </Container>
      }
      <div onMouseOver={handleMouseOver}>
        {children}
      </div>
    </Wrapper>
  )
}

export default Tooltip

