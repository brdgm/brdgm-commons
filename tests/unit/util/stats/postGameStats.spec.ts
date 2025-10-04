import postGameStats from '@/util/stats/postGameStats'
import { expect, vi } from 'vitest'

describe('util/stats/postGameStats', () => {
  let mockFetch: ReturnType<typeof vi.fn>
  const testFormsURL = 'https://docs.google.com/forms/test'

  beforeEach(() => {
    // Mock fetch globally
    mockFetch = vi.fn().mockResolvedValue({ ok: true })
    globalThis.fetch = mockFetch
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0))

  const getFormDataFromCall = () => {
    const callArgs = mockFetch.mock.calls[0]
    return callArgs[1].body as FormData
  }

  const callPostGameStatsAndWait = async (data: object, formsURL: string, fieldMapping?: string) => {
    const result = postGameStats(data, formsURL, fieldMapping)
    await waitForAsync()
    return result
  }

  it('should skip posting when no formsURL is provided', () => {
    const data = { score: 100, turns: 10 }
    
    postGameStats(data)
    
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('should skip posting when formsURL is empty string', () => {
    const data = { score: 100, turns: 10 }
    
    postGameStats(data, '')
    
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('should post data with correct form data when formsURL is provided', async () => {
    const data = { score: 100, turns: 10, money: 250 }
    const fieldMapping = 'score:entry.123;turns:entry.456;money:entry.789'
    
    postGameStats(data, testFormsURL, fieldMapping)
    await waitForAsync()
    
    expect(mockFetch).toHaveBeenCalledOnce()
    expect(mockFetch).toHaveBeenCalledWith(
      testFormsURL,
      expect.objectContaining({
        method: 'POST',
        mode: 'no-cors'
      })
    )
    
    const formData = getFormDataFromCall()
    expect(formData).toBeInstanceOf(FormData)
  })

  it('should map data properties to form fields correctly', async () => {
    const data = { score: 150, turns: 8, difficulty: 'hard' }
    const fieldMapping = 'score:entry.111;turns:entry.222;difficulty:entry.333'
    
    postGameStats(data, testFormsURL, fieldMapping)
    await waitForAsync()
    
    const formData = getFormDataFromCall()
    
    expect(formData.get('entry.111')).toBe('150')
    expect(formData.get('entry.222')).toBe('8')
    expect(formData.get('entry.333')).toBe('hard')
  })

  it('should skip undefined and null values in data', async () => {
    const data = { 
      score: 100, 
      turns: undefined, 
      money: null, 
      difficulty: 'easy' 
    }
    const fieldMapping = 'score:entry.111;turns:entry.222;money:entry.333;difficulty:entry.444'
    
    postGameStats(data, testFormsURL, fieldMapping)
    await waitForAsync()
    
    const formData = getFormDataFromCall()
    
    // Should include non-null/undefined values
    expect(formData.get('entry.111')).toBe('100')
    expect(formData.get('entry.444')).toBe('easy')
    
    // Should skip null/undefined values
    expect(formData.get('entry.222')).toBeNull()
    expect(formData.get('entry.333')).toBeNull()
  })

  it('should skip data properties that are not in field mapping', async () => {
    const data = { 
      score: 100, 
      turns: 10, 
      unmappedField: 'should be ignored' 
    }
    const fieldMapping = 'score:entry.111;turns:entry.222'
    
    postGameStats(data, testFormsURL, fieldMapping)
    await waitForAsync()
    
    const formData = getFormDataFromCall()
    
    expect(formData.get('entry.111')).toBe('100')
    expect(formData.get('entry.222')).toBe('10')
    
    // Check that unmapped field is not included
    const formDataEntries = Array.from(formData.entries())
    expect(formDataEntries.find(([key]) => key.includes('unmappedField'))).toBeUndefined()
  })

  it('should work without field mapping', async () => {
    const data = { score: 100, turns: 10 }
    
    postGameStats(data, testFormsURL)
    await waitForAsync()
    
    expect(mockFetch).toHaveBeenCalledOnce()
    
    const formData = getFormDataFromCall()
    
    // No field mapping means no data should be appended
    const formDataEntries = Array.from(formData.entries())
    expect(formDataEntries).toHaveLength(0)
  })

  it('should handle malformed field mapping gracefully', async () => {
    const data = { score: 100, turns: 10 }
    const malformedMapping = 'score;turns:entry.222;:entry.333;invalidPair'
    
    postGameStats(data, testFormsURL, malformedMapping)
    await waitForAsync()
    
    expect(mockFetch).toHaveBeenCalledOnce()
    
    const formData = getFormDataFromCall()
    
    // Only the valid mapping should work
    expect(formData.get('entry.222')).toBe('10')
    
    // Malformed mappings should be ignored
    const formDataEntries = Array.from(formData.entries())
    expect(formDataEntries).toHaveLength(1)
  })

  it('should convert values to strings', async () => {
    const data = { 
      score: 100, 
      isWinner: true, 
      ratio: 3.14,
      count: 0
    }
    const fieldMapping = 'score:entry.111;isWinner:entry.222;ratio:entry.333;count:entry.444'
    
    postGameStats(data, testFormsURL, fieldMapping)
    await waitForAsync()
    
    const formData = getFormDataFromCall()
    
    expect(formData.get('entry.111')).toBe('100')
    expect(formData.get('entry.222')).toBe('true')
    expect(formData.get('entry.333')).toBe('3.14')
    expect(formData.get('entry.444')).toBe('0')
  })

  it('should handle fetch error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockFetch.mockClear().mockRejectedValue(new Error('Network error'))

    const data = { score: 100 }
    const fieldMapping = 'score:entry.111'
    
    await callPostGameStatsAndWait(data, testFormsURL, fieldMapping)
    
    expect(mockFetch).toHaveBeenCalledOnce()
    expect(consoleSpy).toHaveBeenCalledWith(
      `Failed to post game stats to ${testFormsURL}: `,
      expect.any(Error)
    )
    
    consoleSpy.mockRestore()
  })
})
