import { InvalidParamError } from '../../errors'
import { Validation } from './validation'

export class CompareFieldsValidation implements Validation {
  private readonly fieldName: string
  private readonly fieldToCompareName: string

  constructor (fieldName: string, fieldToCompareName) {
    this.fieldName = fieldName
    this.fieldToCompareName = fieldToCompareName
  }

  validate (input: any): void {
    const isEqual = input[this.fieldName] !== input[this.fieldToCompareName]
    if (!isEqual) {
      throw new InvalidParamError(this.fieldToCompareName)
    }
  }
}
