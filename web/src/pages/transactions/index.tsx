import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { SearchForm } from './components/SearchForm'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
  LoadingSign,
  LoadingSignContainer,
} from './styles'
import { useContextSelector } from 'use-context-selector'
import { PageController } from './components/PageController'
import { useState } from 'react'

export function Transactions() {
  const [currentPage, setCurrentPage] = useState(1)
  const { transactions, numberOfPages, fetchTransactions } = useContextSelector(
    TransactionsContext,
    (context) => {
      const { transactions, numberOfPages, fetchTransactions } = context
      return { transactions, numberOfPages, fetchTransactions }
    },
  )

  function handlePageIncrease() {
    const nextPage = currentPage + 1
    fetchTransactions('', nextPage)
    setCurrentPage((state) => state + 1)
  }

  function handlePageDecrease() {
    const nextPage = currentPage - 1
    fetchTransactions('', nextPage)
    setCurrentPage((state) => state - 1)
  }

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        {transactions.length ? (
          <>
            <TransactionsTable>
              <tbody>
                {transactions.map((transaction) => {
                  return (
                    <tr key={transaction?.id}>
                      <td width="50%">{transaction?.description}</td>
                      <td>
                        <PriceHighLight variant={transaction.type}>
                          {transaction.type === 'income'
                            ? priceFormatter.format(transaction.price)
                            : `- ${priceFormatter.format(transaction.price)}`}
                        </PriceHighLight>
                      </td>
                      <td>{transaction.category}</td>
                      <td>
                        {dateFormatter.format(new Date(transaction.createdAt))}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </TransactionsTable>
            {numberOfPages > 1 && (
              <PageController
                handlePageIncrease={handlePageIncrease}
                handlePageDecrease={handlePageDecrease}
                currentPage={currentPage}
                numberOfPages={numberOfPages}
              />
            )}
          </>
        ) : (
          <LoadingSignContainer>
            <LoadingSign>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </LoadingSign>
          </LoadingSignContainer>
        )}
      </TransactionsContainer>
    </div>
  )
}
