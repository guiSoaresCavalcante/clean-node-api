import { httpRequest, Controller, EmailValidator, AddAccount } from './signup-protocols'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'

// Todos os controllers precisam implementar uma interface
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    // delegamos a resposabilidade de validar emails para outra classe
    this.emailValidator = emailValidator // injetando o emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: httpRequest): Promise<any> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
