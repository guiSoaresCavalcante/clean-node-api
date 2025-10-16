import express from 'express'

// Local onde criamos nossos factories. Camada altamento acoplada. Por conta
// disso nao criamos testes unitarios e sim de integracao

const app = express()
app.listen(5050, () => { console.log('Server runing at http://localhost:5050') })
