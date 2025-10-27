import { Validation } from './validation'

export class ValidationComposite implements Validation {
  private readonly validations: Validation[]

  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): void {
    for (const validation of this.validations) {
      validation.validate(input)
    }
  }
}
