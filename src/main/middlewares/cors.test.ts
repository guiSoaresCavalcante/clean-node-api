import request from 'supertest'
import app from '../config/app'

// Nesse arquivo ficarao os testes de integracao. Por isso a extensao .test ao inves de .spec

describe('Cors Middleware', () => {
  test('Should enable cors', async () => {
    // criando uma nova rota no nosso app (temporaria) e simulando uma requisicao
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*') // aceitando requisicoes de qualquer origem
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
