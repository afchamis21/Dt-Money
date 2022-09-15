import { Request, Response } from 'express'
import { CreateNewTransactionUseCase } from './CreateNewTransactionUseCase'

export class CreateNewTransactionController {
  async handle(request: Request, response: Response) {
    const { category, description, price, type } = request.body

    const createNewTransactionUseCase = new CreateNewTransactionUseCase()
    const newTransaction = await createNewTransactionUseCase.execute({
      category,
      description,
      price,
      type,
    })

    return response.json(newTransaction)
  }
}
