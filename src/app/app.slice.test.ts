import { appReducer, RequestStatusType, setAppError, setAppInitialized } from './app.slice'

let initialState: {
  status: RequestStatusType,
  error: null | string,
  isInitialized: boolean
}

beforeEach(() => {
  initialState = {
    status: 'loading',
    error: null,
    isInitialized: false
  }
})

test('should handle setAppInitialized', () => {
  const action = setAppInitialized({ isInitialized: true })
  const newState = appReducer(initialState, action)

  expect(newState.isInitialized).toBe(true)
})
test('should handle setAppError', () => {
  const action = setAppError({ error: 'Some error message' })
  const newState = appReducer(initialState, action)

  expect(newState.error).toBe('Some error message')
})
test('should handle pending action', () => {
  const action = { type: 'someAction/pending' }
  const newState = appReducer(initialState, action)

  expect(newState.status).toBe('loading')
})
test('should handle fulfilled action', () => {
  const action = { type: 'someAction/fulfilled' }
  const newState = appReducer(initialState, action)

  expect(newState.status).toBe('succeeded')
})
test('should handle rejected action', () => {
  const action = { type: 'someAction/rejected' }
  const newState = appReducer(initialState, action)

  expect(newState.status).toBe('failed')
})
test('should handle action with payload', () => {
  const payload = {
    showGlobalError: true,
    data: {
      messages: ['Error message']
    }
  }
  const action = { type: 'someAction/rejected', payload }
  const newState = appReducer(initialState, action)

  expect(newState.status).toBe('failed')
  expect(newState.error).toBe('Error message')
})
test('should handle action with error', () => {
  const error = { message: 'Some error message' }
  const action = { type: 'someAction/rejected', error }
  const newState = appReducer(initialState, action)

  expect(newState.status).toBe('failed')
  expect(newState.error).toBe('Some error message')
})