import { json } from 'express'

// definindo um middleware para fazer o parse das nossas requisicoes
export const bodyParser = json()
