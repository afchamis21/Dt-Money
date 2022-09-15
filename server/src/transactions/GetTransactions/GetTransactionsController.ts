import { Request, Response } from 'express'
import { GetTransactionsUseCase } from './GetTransactionsUseCase'

export class GetTransactionsController {
  async handle(request: Request, response: Response) {
    const getTransactionsUseCase = new GetTransactionsUseCase()
    const transactions = await getTransactionsUseCase.execute()

    return response.json(transactions)
  }
}
