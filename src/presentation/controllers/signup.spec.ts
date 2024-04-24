import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-erros'
import { InvalidParamError } from '../errors/invalid-param-erros'
import { EmailValidator } from '../protocols/email-validator'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

// usamos um factory method para facilitar a criação do sut
const makeSuit = (): SutTypes => {
  // injentando uma versão mockada de um validator no nosso controller
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true // é boa pratica mockar o stub com um valor que não da erro
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub // retornando o stub para poder mockar os dados
  }
  // nossa classe não é responsável pela validação do email, por isso estamos marretando o retorno
  // estamos testando como ela lida com os retornos da função
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut } = makeSuit()
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const HttpResponse = sut.handle(httpRequest)
    expect(HttpResponse.statusCode).toBe(400)
    expect(HttpResponse.body).toEqual(new MissingParamError('name'))
  })
})

describe('SignUp Controller', () => {
  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSuit()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const HttpResponse = sut.handle(httpRequest)
    expect(HttpResponse.statusCode).toBe(400)
    expect(HttpResponse.body).toEqual(new MissingParamError('email'))
  })
})

describe('SignUp Controller', () => {
  test('Should return 400 if no password is provided', () => {
    const { sut } = makeSuit()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const HttpResponse = sut.handle(httpRequest)
    expect(HttpResponse.statusCode).toBe(400)
    expect(HttpResponse.body).toEqual(new MissingParamError('password'))
  })
})

describe('SignUp Controller', () => {
  test('Should return 400 if no password confirmation is provided', () => {
    const { sut } = makeSuit()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const HttpResponse = sut.handle(httpRequest)
    expect(HttpResponse.statusCode).toBe(400)
    expect(HttpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})

describe('SignUp Controller', () => {
  test('Should return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSuit() // o SignUpController não ira validar email, iremos injetar uma dependência
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false) // usando o jest para alterar o valor default do retorno
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com', // O texto que passamos não faz diferença para o teste
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const HttpResponse = sut.handle(httpRequest)
    expect(HttpResponse.statusCode).toBe(400)
    expect(HttpResponse.body).toEqual(new InvalidParamError('email'))
  })
})

describe('SignUp Controller', () => {
  test('Should call emailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSuit()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
