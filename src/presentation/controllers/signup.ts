import { type httpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-erros'

export class SignUpController {
  handle (httpRequest: httpRequest): any {
    if (!httpRequest.body.name) {
      return {
        body: new MissingParamError('name'),
        statusCode: 400
      }
    }
    if (!httpRequest.body.email) {
      return {
        body: new MissingParamError('email'),
        statusCode: 400
      }
    }
  }
}
