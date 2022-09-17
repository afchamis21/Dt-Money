import { prisma } from '../../database/prismaClient'

export class GetTransactionsUseCase {
  async execute(params: any) {
    const query = params.q
    const sortBy = params._sort
    const order = params._order
    const page = params._page
    const limit = params._limit
    let amountOfPages = 1

    const queryConfig: any = {}

    if (query) {
      queryConfig.where = {
        OR: [
          {
            category: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
          {
            type: {
              contains: query,
            },
          },
        ],
      }
    }

    if (sortBy ?? order) {
      queryConfig.orderBy = {}
      queryConfig.orderBy[sortBy] = order
    }

    if (page ?? limit) {
      queryConfig.skip = (page - 1) * limit
      queryConfig.take = Number(limit)

      const amountOfTransactions = await prisma.transactions.count()

      amountOfPages = Math.ceil(amountOfTransactions / limit)
    }

    const transactions = await prisma.transactions.findMany(queryConfig)

    const totalTransactions = await prisma.transactions.groupBy({
      by: ['type'],
      _sum: {
        price: true,
      },
    })

    const transactionSummary = totalTransactions.map((transaction) => {
      console.log(transaction)
      return {
        type: transaction.type,
        price: transaction._sum.price,
      }
    })

    return { transactions, amountOfPages, transactionSummary }
  }
}
