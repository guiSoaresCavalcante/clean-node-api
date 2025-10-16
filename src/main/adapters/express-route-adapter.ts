import { Controller, httpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

// Criando um adapter para o nosso controlador. Ele espera um httpRequest como parametro,
// mas o express envia um metodo com req, res. Agora o express esta desacoplado da nossa
// aplicacao.
export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: httpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
