import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

// testes de integração usando o mongo em memória

describe('Account Mongo Repository', () => {
  // antes dos testes devemos conectar com o mongodb
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
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
