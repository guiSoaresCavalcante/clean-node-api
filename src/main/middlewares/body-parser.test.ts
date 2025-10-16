import request from 'supertest'
import app from '../config/app'

// Nesse arquivo ficarao os testes de integracao. Por isso a extensao .test ao inves de .spec

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    // criando uma nova rota no nosso app (temporaria) e simulando uma requisicao
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Guilherme' })
      .expect({ name: 'Guilherme' })
  })
})
