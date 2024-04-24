import { HttpResponse, httpRequest } from './http'

export interface Controller {
  handle: (httpRequest: httpRequest) => HttpResponse
}
