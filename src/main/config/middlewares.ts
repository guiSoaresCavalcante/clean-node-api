import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'

// Criando nossos middlewares
export default (app: Express): void => {
  app.use(bodyParser) // usando o middleware criado
}
