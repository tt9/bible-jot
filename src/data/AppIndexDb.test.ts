import { promisifyDbRequest } from './AppIndexDb'

describe('promisifyRequest', () => {
  it('should convert the request/response into a promise', async () => {
    const testRequest = {} as any
    const resultPromise = promisifyDbRequest(testRequest)
    testRequest.onsuccess()
    await resultPromise
    expect(resultPromise instanceof Promise).toBe(true)
  })

  it('should convert the request/response into a promise error branch', async () => {
    const testRequest = {} as any
    const resultPromise = promisifyDbRequest(testRequest)

    expect(resultPromise instanceof Promise).toBe(true)
    const testPromise = expect(resultPromise).rejects.toThrow(
      'Something went wrong',
    )

    testRequest.error = 'Something went wrong'
    testRequest.onerror()
    await testPromise
  })
})
