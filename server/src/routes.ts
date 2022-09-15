import { Router } from 'express'
import { CreateNewTransactionController } from './transactions/CreateNewTransaction/CreateNewTransactionController'
import { GetTransactionsController } from './transactions/GetTransactions/GetTransactionsController'

const routes = Router()

const getTransactionsController = new GetTransactionsController()
const createNewTransactionController = new CreateNewTransactionController()

routes.get('/transactions', getTransactionsController.handle)

routes.post('/transactions', createNewTransactionController.handle)

export { routes }
