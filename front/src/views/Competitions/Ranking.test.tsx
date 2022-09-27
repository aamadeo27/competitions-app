import React from 'react'
import { render, screen } from '@testing-library/react'
import Ranking from './Ranking'


test('renders learn react link', () => {
  render(<Ranking players={[]} key='rankgin' />)
  const linkElement = screen.getByText(/Rank/i)
  expect(linkElement).toBeInTheDocument()
})