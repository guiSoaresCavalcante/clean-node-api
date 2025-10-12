import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

// testes de integração usando o mongo em memória

describe('Account Mongo Repository', () => {
  // antes dos testes devemos conectar com o mongodb
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  // depois dos testes desconectamos do banco
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  // em um teste de integracao com o db, e boa pratica limparmos o banco apos cada teste
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    // como não sabemos o id que o banco ira retornar, não conseguimos comparar o resultado
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email')
    expect(account.password).toBe('any_password')
  })
})
