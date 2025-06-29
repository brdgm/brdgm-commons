import postGameStats from '@/util/stats/postGameStats'
import { expect, vi } from 'vitest'

describe('util/stats/postGameStats', () => {
  beforeEach(() => {
    // Mock fetch globally
    global.fetch = vi.fn()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should skip posting when no formsURL is provided', () => {
    const data = { score: 100, turns: 10 }
    
    postGameStats(data)
    
    expect(fetch).not.toHaveBeenCalled()
  })

  it('should skip posting when formsURL is empty string', () => {
    const data = { score: 100, turns: 10 }
    
    postGameStats(data, '')
    
    expect(fetch).not.toHaveBeenCalled()
  })

  it('should post data with correct form data when formsURL is provided', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    })
    global.fetch = mockFetch

    const data = { score: 100, turns: 10, money: 250 }
    const formsURL = 'https://docs.google.com/forms/test'
    const fieldMapping = 'score:entry.123;turns:entry.456;money:entry.789'
    
    postGameStats(data, formsURL, fieldMapping)
    
    // Wait for async operation
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockFetch).toHaveBeenCalledOnce()
    expect(mockFetch).toHaveBeenCalledWith(
      formsURL,
      expect.objectContaining({
        method: 'POST',
        mode: 'no-cors'
      })
    )
    
    // Check that FormData was created with correct mappings
    const callArgs = mockFetch.mock.calls[0]
    const formData = callArgs[1].body
    expect(formData).toBeInstanceOf(FormData)
  })

  it('should map data properties to form fields correctly', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true })
    global.fetch = mockFetch

    const data = { score: 150, turns: 8, difficulty: 'hard' }
    const formsURL = 'https://docs.google.com/forms/test'
    const fieldMapping = 'score:entry.111;turns:entry.222;difficulty:entry.333'
    
    postGameStats(data, formsURL, fieldMapping)
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const callArgs = mockFetch.mock.calls[0]
    const formData = callArgs[1].body as FormData
    
    // Verify form data contains mapped values
    expect(formData.get('entry.111')).toBe('150')
    expect(formData.get('entry.222')).toBe('8')
    expect(formData.get('entry.333')).toBe('hard')
  })

  it('should skip undefined and null values in data', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true })
    global.fetch = mockFetch

    const data = { 
      score: 100, 
      turns: undefined, 
      money: null, 
      difficulty: 'easy' 
    }
    const formsURL = 'https://docs.google.com/forms/test'
    const fieldMapping = 'score:entry.111;turns:entry.222;money:entry.333;difficulty:entry.444'
    
    postGameStats(data, formsURL, fieldMapping)
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const callArgs = mockFetch.mock.calls[0]
    const formData = callArgs[1].body as FormData
    
    // Should include non-null/undefined values
    expect(formData.get('entry.111')).toBe('100')
    expect(formData.get('entry.444')).toBe('easy')
    
    // Should skip null/undefined values
    expect(formData.get('entry.222')).toBeNull()
    expect(formData.get('entry.333')).toBeNull()
  })

  it('should skip data properties that are not in field mapping', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true })
    global.fetch = mockFetch

    const data = { 
      score: 100, 
      turns: 10, 
      unmappedField: 'should be ignored' 
    }
    const formsURL = 'https://docs.google.com/forms/test'
    const fieldMapping = 'score:entry.111;turns:entry.222'
    
    postGameStats(data, formsURL, fieldMapping)
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const callArgs = mockFetch.mock.calls[0]
    const formData = callArgs[1].body as FormData
    
    expect(formData.get('entry.111')).toBe('100')
    expect(formData.get('entry.222')).toBe('10')
    
    // Check that unmapped field is not included
    const formDataEntries = Array.from(formData.entries())
    expect(formDataEntries.find(([key]) => key.includes('unmappedField'))).toBeUndefined()
  })

  it('should work without field mapping', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true })
    global.fetch = mockFetch

    const data = { score: 100, turns: 10 }
    const formsURL = 'https://docs.google.com/forms/test'
    
    postGameStats(data, formsURL)
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockFetch).toHaveBeenCalledOnce()
    
    const callArgs = mockFetch.mock.calls[0]
    const formData = callArgs[1].body as FormData
    
    // No field mapping means no data should be appended
    const formDataEntries = Array.from(formData.entries())
    expect(formDataEntries).toHaveLength(0)
  })

  it('should handle malformed field mapping gracefully', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true })
    global.fetch = mockFetch

    const data = { score: 100, turns: 10 }
    const formsURL = 'https://docs.google.com/forms/test'
    const malformedMapping = 'score;turns:entry.222;:entry.333;invalidPair'
    
    postGameStats(data, formsURL, malformedMapping)
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockFetch).toHaveBeenCalledOnce()
    
    const callArgs = mockFetch.mock.calls[0]
    const formData = callArgs[1].body as FormData
    
    // Only the valid mapping should work
    expect(formData.get('entry.222')).toBe('10')
    
    // Malformed mappings should be ignored
    const formDataEntries = Array.from(formData.entries())
    expect(formDataEntries).toHaveLength(1)
  })

  it('should convert values to strings', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true })
    global.fetch = mockFetch

    const data = { 
      score: 100, 
      isWinner: true, 
      ratio: 3.14,
      count: 0
    }
    const formsURL = 'https://docs.google.com/forms/test'
    const fieldMapping = 'score:entry.111;isWinner:entry.222;ratio:entry.333;count:entry.444'
    
    postGameStats(data, formsURL, fieldMapping)
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    const callArgs = mockFetch.mock.calls[0]
    const formData = callArgs[1].body as FormData
    
    expect(formData.get('entry.111')).toBe('100')
    expect(formData.get('entry.222')).toBe('true')
    expect(formData.get('entry.333')).toBe('3.14')
    expect(formData.get('entry.444')).toBe('0')
  })

  it('should handle fetch error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'))
    global.fetch = mockFetch

    const data = { score: 100 }
    const formsURL = 'https://docs.google.com/forms/test'
    const fieldMapping = 'score:entry.111'
    
    postGameStats(data, formsURL, fieldMapping)
    
    // Wait for async operation and error handling
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockFetch).toHaveBeenCalledOnce()
    expect(consoleSpy).toHaveBeenCalledWith(
      `Failed to post game stats to ${formsURL}: `,
      expect.any(Error)
    )
    
    consoleSpy.mockRestore()
  })

  it('should log success message on successful post', async () => {
    const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
    const mockFetch = vi.fn().mockResolvedValue({ ok: true })
    global.fetch = mockFetch

    const data = { score: 100 }
    const formsURL = 'https://docs.google.com/forms/test'
    const fieldMapping = 'score:entry.111'
    
    postGameStats(data, formsURL, fieldMapping)
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockFetch).toHaveBeenCalledOnce()
    expect(consoleSpy).toHaveBeenCalledWith('Game stats posted successfully')
    
    consoleSpy.mockRestore()
  })
})
