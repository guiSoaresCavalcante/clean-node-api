import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

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
