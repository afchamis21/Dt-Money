import { SummaryCard, SummaryContainer } from './styles'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'

export function Summary() {
  const transactionSummary = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.transactionSummary
    },
  )

  const income = transactionSummary.find((summary) => {
    return summary.type === 'income'
  })?.price

  const outcome = transactionSummary.find((summary) => {
    return summary.type === 'outcome'
  })?.price

  const total = income! - outcome!

  const isTotalPositive = total >= 0

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{income ? priceFormatter.format(income) : 0}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{outcome ? priceFormatter.format(outcome) : 0}</strong>
      </SummaryCard>
      <SummaryCard variant={isTotalPositive ? 'positive' : 'negative'}>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{priceFormatter.format(total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
