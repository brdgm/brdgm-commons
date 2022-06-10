import getErrorMessage from '@/util/error/getErrorMessage'
import TranslatableError from '@/util/error/TranslatableError'
import { expect } from 'chai'

describe('util/error/getErrorMessage', () => {
  it('string', () => {
    const result = getErrorMessage('my-message', translError => 'translate/' + translError.key)
    expect(result).to.eql('my-message')
  })

  it('error', () => {
    const result = getErrorMessage(new Error('my-error-message'), translError => 'translate/' + translError.key)
    expect(result).to.eql('my-error-message')
  })

  it('translatableError', () => {
    const result = getErrorMessage(new TranslatableError('internal-message','my-error-message-key'), translError => 'translate/' + translError.key)
    expect(result).to.eql('translate/my-error-message-key')
  })
})
