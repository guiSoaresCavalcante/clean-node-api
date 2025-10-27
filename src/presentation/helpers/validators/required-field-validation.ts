import { MissingParamError } from '../../errors'
import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
  private readonly fieldName: string

  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): void {
    const hasField = input[this.fieldName]
    if (!hasField) {
      throw new MissingParamError(this.fieldName)
    }
  }
}
