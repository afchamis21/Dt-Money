import { NextFunction, Request } from 'express'

const ChangeHeaderAllowAccess = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888')

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  )

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
}
