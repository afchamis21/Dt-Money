import styled, { css } from 'styled-components'

export const PageControllerContainer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  & > button {
    line-height: 0;
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme['green-500']};

    &:disabled {
      color: ${(props) => props.theme['gray-600']};
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      filter: brightness(1.2);
      cursor: pointer;
    }
  }
`

export const PageNumbersContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`

interface PageCardProps {
  variant?: 'active' | 'notActive'
}

export const PageCard = styled.div<PageCardProps>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;

  border-radius: 6px;

  ${(props) =>
    props.variant === 'active'
      ? css`
          background: ${props.theme['green-700']};
          color: ${props.theme['gray-100']};
        `
      : css`
          background: ${props.theme['gray-600']};
          color: ${props.theme['gray-400']};
        `};
`
