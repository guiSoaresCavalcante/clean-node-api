import { MissingParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error | null {
    const hasField = input[this.fieldName]
    if (!hasField) {
      return new MissingParamError(this.fieldName)
    }
    return null
  }
}
