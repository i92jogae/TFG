import { render } from '@testing-library/react'
import App from './App'

jest.mock('axios', () => {
  const mockApiClient = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn()
      }
    }
  }

  return {
    __esModule: true,
    default: {
      create: jest.fn(() => mockApiClient),
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    }
  }
})

test('renders the public app shell without crashing', () => {
  render(<App />)

  expect(document.body).toBeInTheDocument()
})
