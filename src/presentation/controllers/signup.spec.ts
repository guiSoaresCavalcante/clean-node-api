import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const HttpResponse = sut.handle(httpRequest)
    expect(HttpResponse.statusCode).toBe(400)
    expect(HttpResponse.body).toEqual(new Error('Missing param: name'))
  })
})
