import { Request, Response } from 'express'
import { GetTransactionsUseCase } from './GetTransactionsUseCase'

export class GetTransactionsController {
  async handle(request: Request, response: Response) {
    const params = request.query

    const getTransactionsUseCase = new GetTransactionsUseCase()
    const transactions = await getTransactionsUseCase.execute(params)

    return response.json(transactions)
  }
}
