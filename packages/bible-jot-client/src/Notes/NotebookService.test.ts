

import { vi, type Mock } from 'vitest'
import { getNotebookFromIndexDb } from './NotebookService'



var mockGetDb: Mock
var mockPromisifyDbRequest: Mock

vi.mock('../data/AppIndexDb', () => {
    mockGetDb = vi.fn()
    mockPromisifyDbRequest = vi.fn()
    return {
        getDb: mockGetDb,
        promisifyDbRequest: mockPromisifyDbRequest,
        NotebookObjectStoreName: 'test'
    }
})

describe('NotebookService', () => {


    describe('getNotebookFromIndexDb', () => {

        it('should call getDb', async () => {
            mockGetDb.mockImplementationOnce(() => {
                return {
                    transaction: () => {
                        return {
                            objectStore: () => {
                                return {
                                    get: () => {},
                                    openCursor: () => {
                                        return {
                                            onsuccess: () => {},
                                            onerror: () => {},
                                        }
                                    },
                                }
                            },
                        }
                    },
                }
            })

            mockPromisifyDbRequest.mockImplementationOnce(() => {
                return {
                    result: {
                        value: {
                            id: 'test',
                            name: 'test',
                            createdAt: 'test',
                            updatedAt: 'test',
                        }
                    }
                }
            })
            await getNotebookFromIndexDb('test')
            expect(mockGetDb).toHaveBeenCalled()
        })
    })
})