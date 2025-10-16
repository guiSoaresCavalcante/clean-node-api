import { Express } from 'express'
import { bodyParser, cors, contentType } from '../middlewares'

// Criando nossos middlewares
export default (app: Express): void => {
  app.use(bodyParser) // usando o middleware criado
  app.use(cors)
  app.use(contentType)
}
