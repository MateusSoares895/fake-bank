import knex from 'knex'
import { resolve } from 'path'

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename:
      process.env.NODE_ENV === 'test'
        ? resolve(__dirname, '..', '..', '__tests__', 'database.sqlite')
        : resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
})

export default connection
