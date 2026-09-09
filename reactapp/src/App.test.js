import { render } from '@testing-library/react'
import App from './App'

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}))

test('renders the public app shell without crashing', () => {
  render(<App />)

  expect(document.body).toBeInTheDocument()
})
