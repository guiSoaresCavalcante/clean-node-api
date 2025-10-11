export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError' // e uma boa pratica setar o nome do erro
  }
}
