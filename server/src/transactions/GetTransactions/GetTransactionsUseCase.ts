import { prisma } from '../../database/prismaClient'

export class GetTransactionsUseCase {
  async execute() {
    const transactions = await prisma.transactions.findMany()

    return transactions
  }
}
