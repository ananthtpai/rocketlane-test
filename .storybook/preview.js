import React from 'react'
import styled from 'styled-components'

const StoryContainer = styled.div`
  width: 300px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  }
}

export const decorators = [
  (Story) => (
    <StoryContainer>
      <Story />
    </StoryContainer>
  )
]
