import { type HttpResponse, type httpRequest } from './http'

export interface Controller {
  handle: (httpRequest: httpRequest) => HttpResponse
}
