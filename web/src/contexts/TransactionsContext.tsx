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
  type: 'income' | 'outcome'
  price: number
}

interface TransactionContextType {
  numberOfPages: number
  transactions: Transaction[]
  transactionSummary: TransactionSummary[]
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
  const [transactionSummary, setTransactionSummary] = useState<
    TransactionSummary[]
  >([])

  const fetchTransactions = useCallback(async (query?: string, page = 1) => {
    const response = await api.get('/transactions', {
      params: {
        _page: page,
        _limit: 6,
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    const lastPage = response.data.amountOfPages

    setNumberOfPages((state) => {
      if (state !== lastPage) {
        return lastPage
      } else {
        return state
      }
    })

    const summary = response.data.transactionSummary

    setTransactionSummary((state) => {
      if (state !== summary) {
        return summary
      } else {
        return state
      }
    })

    setTransactions(response.data.transactions)
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

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
