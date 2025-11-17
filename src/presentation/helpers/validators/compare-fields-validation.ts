import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error | null {
    const isEqual = input[this.fieldName] === input[this.fieldToCompareName]
    if (!isEqual) {
      return new InvalidParamError(this.fieldToCompareName)
    }
    return null
  }
}
