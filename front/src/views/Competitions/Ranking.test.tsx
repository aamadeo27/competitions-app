import React from 'react'
import { render, screen } from '@testing-library/react'
import Ranking from './Ranking'


const players = [
  {
    steamId: 'player-1',
    name: '[LGND] BuBzZz',
    avatar: '',
    games: 6,
    score: 17
  },
  {
    steamId: 'player-3',
    name: 'VerteX',
    avatar: '',
    games: 5,
    score: 14
  },
  {
    steamId: 'player-2',
    name: '[KGB] blackwoltz',
    avatar: '',
    games: 5,
    score: 12
  }
]

test('renders ranking', () => {
  render(<Ranking players={players} key='ranking' />)
  const linkElement = screen.getByText(/Rank/i)
  
  expect(linkElement).toBeInTheDocument()

  expect(screen.getByText(/\[LGND\] BuBzZz/i)).toBeInTheDocument()
  expect(screen.getByText(/VerteX/i)).toBeInTheDocument()
  expect(screen.getByText(/\[KGB\] blackwoltz/i)).toBeInTheDocument()
})