import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionSummary {
  income: number
  outcome: number
}

interface TransactionContextType {
  numberOfPages: number
  transactions: Transaction[]
  transactionSummary: TransactionSummary
  fetchTransactions: (query?: string, _page?: number) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [transactionSummary, setTransactionSummary] =
    useState<TransactionSummary>({ income: 0, outcome: 0 })

  const TRANSACTION_LIMIT_PER_PAGE = 6

  const fetchTransactions = useCallback(async (query?: string, page = 1) => {
    const response = await api.get('/transactions', {
      params: {
        _page: page,
        _limit: TRANSACTION_LIMIT_PER_PAGE,
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data.transactions)
  }, [])

  const fetchAmountOfTransactions = useCallback(async () => {
    const response = await api.get('/transactions/amount')
    const amountOfTransactions = response.data.amountOfTransactions

    const numberOfPages = Math.ceil(
      amountOfTransactions / TRANSACTION_LIMIT_PER_PAGE,
    )

    setNumberOfPages(numberOfPages)
  }, [])

  const fetchTransactionSummary = useCallback(async () => {
    const response = await api.get('/transactions/summary')

    const summary = response.data.transactionSummary

    setTransactionSummary(summary)
  }, [])

  useEffect(() => {
    fetchTransactionSummary()
    fetchTransactions()
    fetchAmountOfTransactions()
  }, [fetchAmountOfTransactions, fetchTransactions, fetchTransactionSummary])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { category, description, price, type } = data

      const response = await api.post('/transactions', {
        category,
        description,
        price,
        type,
      })

      setTransactions((state) => [response.data, ...state])
      setTransactionSummary((state) => {
        if (type === 'income') {
          return {
            ...state,
            income: state.income + price,
          }
        } else {
          return {
            ...state,
            outcome: state.outcome + price,
          }
        }
      })
    },
    [],
  )

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        numberOfPages,
        transactionSummary,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
