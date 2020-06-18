import { resolve } from 'path'

module.exports = {
  client: 'sqlite3',
  connection: {
    filename:
      process.env.NODE_ENV === 'test'
        ? resolve(__dirname, '..', '..', '__tests__', 'database.sqlite')
        : resolve(__dirname, 'database.sqlite'),
  },
  migrations: {
    directory: resolve(__dirname, 'migrations'),
  },
  useNullAsDefault: true,
}
