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
  const { transactions, numberOfPages } = useContextSelector(
    TransactionsContext,
    (context) => {
      const { transactions, numberOfPages } = context
      return { transactions, numberOfPages }
    },
  )

  function handlePageIncrease() {
    setCurrentPage((state) => state + 1)
  }

  function handlePageDecrease() {
    setCurrentPage((state) => state - 1)
  }

  const transactionsInCurrentPage = transactions.filter((_, index) => {
    return !(index < (currentPage - 1) * 6) && !(index >= currentPage * 6)
  })

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
                {transactionsInCurrentPage.map((transaction) => {
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
            {numberOfPages > 1 ?? (
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
