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

interface TransactionContextType {
  numberOfPages: number
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [numberOfPages, setNumberOfPages] = useState(0)

  const getLastPage = (links: string[]) => {
    const lastLink = links.at(-1)?.split(';')[0]
    const linkArgs = lastLink?.split('?')[1].split('&')
    const pageArg = linkArgs?.find((arg) => arg.includes('page='))
    const pageNumber = pageArg?.split('=').at(-1)
    return Number(pageNumber)
  }

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
    const lastPage = response.headers.link
      ? getLastPage(response.headers.link.split(','))
      : numberOfPages

    setNumberOfPages((state) => {
      if (state !== lastPage) {
        return lastPage
      } else {
        return state
      }
    })
    setTransactions(response.data)
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
        createdAt: new Date(),
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
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
