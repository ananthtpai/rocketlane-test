import React from 'react'
import styled from 'styled-components'

const StoryContainer = styled.div`
  display: flex;
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
