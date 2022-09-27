import React from 'react'
import { render, screen } from '@testing-library/react'
import Matches from './Matches'


test('renders learn react link', () => {
  render(<Matches matches={[]} ranking={new Map()} key={1} />)
  // const linkElement = screen.getByText(/Matches/i)
  // expect(linkElement).toBeInTheDocument()
})