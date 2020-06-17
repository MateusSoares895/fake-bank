import express from 'express'
import cors from 'cors'
import routes from './routes'

export default class App {
  private express: express.Application
  constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }
  private middlewares() {
    this.express.use(express.json())
    this.express.use(cors())
  }
  private routes() {
    this.express.use(routes)
  }
  public start() {
    this.express.listen(3333)
  }
}
