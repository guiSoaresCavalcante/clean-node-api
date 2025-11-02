import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class CompareFieldsValidation implements Validation {
  private readonly fieldName: string
  private readonly fieldToCompareName: string

  constructor (fieldName: string, fieldToCompareName: string) {
    this.fieldName = fieldName
    this.fieldToCompareName = fieldToCompareName
  }

  validate (input: any): Error | null {
    const isEqual = input[this.fieldName] === input[this.fieldToCompareName]
    if (!isEqual) {
      return new InvalidParamError(this.fieldToCompareName)
    }
    return null
  }
}
