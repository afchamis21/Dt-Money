import { CaretLeft, CaretRight } from 'phosphor-react'
import { calculateNumberOfPages } from '../../../../utils/numberOfPages'
import {
  PageCard,
  PageControllerContainer,
  PageNumbersContainer,
} from './styles'

interface PageControllerProps {
  currentPage: number
  numberOfPages: number
  handlePageIncrease: () => void
  handlePageDecrease: () => void
}

export function PageController({
  currentPage,
  handlePageIncrease,
  handlePageDecrease,
  numberOfPages,
}: PageControllerProps) {
  const pages = calculateNumberOfPages(numberOfPages)

  return (
    <PageControllerContainer>
      <button disabled={currentPage === 1} onClick={handlePageDecrease}>
        <CaretLeft size={24} />
      </button>
      <PageNumbersContainer>
        {pages.map((page) => {
          return (
            <PageCard
              key={page}
              variant={page === currentPage ? 'active' : 'notActive'}
            >
              {page}
            </PageCard>
          )
        })}
      </PageNumbersContainer>
      <button
        disabled={currentPage === numberOfPages}
        onClick={handlePageIncrease}
      >
        <CaretRight size={24} />
      </button>
    </PageControllerContainer>
  )
}
