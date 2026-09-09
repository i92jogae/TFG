import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the DB Learning application shell', () => {
  render(<App />)

  expect(screen.getByText(/DB Learning/i)).toBeInTheDocument()
})
