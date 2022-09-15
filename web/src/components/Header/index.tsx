import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { useState } from 'react'

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
