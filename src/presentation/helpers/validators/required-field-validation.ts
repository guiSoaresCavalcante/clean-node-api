import { MissingParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class RequiredFieldValidation implements Validation {
  private readonly fieldName: string

  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error | null {
    const hasField = input[this.fieldName]
    if (!hasField) {
      return new MissingParamError(this.fieldName)
    }
    return null
  }
}
