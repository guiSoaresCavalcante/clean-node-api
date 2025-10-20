import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    // pegando o id inserido
    const accountId = result.insertedId

    // pegando o account
    const account = await accountCollection.findOne({ _id: accountId })
    if (!account) {
      throw new Error()
    }

    return MongoHelper.map(account)
  }
}
