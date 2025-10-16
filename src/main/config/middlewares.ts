import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'
import { cors } from '../middlewares/cors'

// Criando nossos middlewares
export default (app: Express): void => {
  app.use(bodyParser) // usando o middleware criado
  app.use(cors)
}
