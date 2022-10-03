import React from 'react'
import { render, screen } from '@testing-library/react'
import Matches from './Matches'


const matches = [
  {
    id: '',
    name: '',
    phase: 1,
    rounds: 1,
    competitionId: '',
    competitor1: 'player-1',
    competitor2: 'player-2',
    player1: {
      steamId: 'player-1',
      name: 'Player 1',
      avatar: '',
    },
    player2: {
      steamId: 'player-2',
      name: 'Player 2',
      avatar: '',
    },
    results: [{ winner: 'player-1', id: '', details: '{}', matchId: '', order: 0 }],
    start: new Date(),
  },{
    id: '',
    name: '',
    phase: 1,
    rounds: 1,
    competitionId: '',
    competitor1: 'player-3',
    competitor2: 'player-4',
    player1: {
      steamId: 'player-3',
      name: 'Player 3',
      avatar: '',
    },
    player2: {
      steamId: 'player-4',
      name: 'Player 4',
      avatar: '',
    },
    start: new Date(),
  }
]

test('renders matches', () => {
  render(<Matches matches={matches} ranking={new Map()} key={1} />)

  expect(screen.getByText(/Played/i)).toBeInTheDocument()
  expect(screen.getByText(/Player 1/i)).toBeInTheDocument()
  expect(screen.getByText(/Player 2/i)).toBeInTheDocument()

  expect(screen.getByText(/Scheduled/i)).toBeInTheDocument()
  expect(screen.getByText(/Player 3/i)).toBeInTheDocument()
  expect(screen.getByText(/Player 4/i)).toBeInTheDocument()
})