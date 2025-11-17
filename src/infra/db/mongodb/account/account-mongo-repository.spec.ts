import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

// testes de integração usando o mongo em memória

let accountCollection: Collection

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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    // como não sabemos o id que o banco ira retornar, não conseguimos comparar o resultado
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeFalsy()
  })

  test('Should update the account accesstoken on updateAccessToken success', async () => {
    const sut = makeSut()
    const result = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const fakeId = result.insertedId
    await sut.updateAccessToken(fakeId.toString(), 'any_token')
    const account = await accountCollection.findOne({ _id: fakeId })

    expect(account).toBeTruthy()
    expect(account?.accessToken).toBe('any_token')
  })
})
