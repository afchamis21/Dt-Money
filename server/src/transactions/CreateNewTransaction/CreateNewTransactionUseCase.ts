import { prisma } from '../../database/prismaClient'

interface INewTransaction {
  category: string
  description: string
  price: number
  type: string
}

export class CreateNewTransactionUseCase {
  async execute({ category, description, price, type }: INewTransaction) {
    const newTransaction = await prisma.transactions.create({
      data: {
        category,
        description,
        price,
        type,
        createdAt: new Date(),
      },
    })

    return newTransaction
  }
}
