import express from 'express'
import setupMiddlewares from './middlewares'

// Local onde criamos nossos factories. Camada altamento acoplada. Por conta
// disso nao criamos testes unitarios e sim de integracao

const app = express()
setupMiddlewares(app) // configurando o app para usar os middlewares
export default app
