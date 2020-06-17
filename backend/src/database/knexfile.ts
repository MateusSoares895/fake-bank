import { resolve } from 'path'

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: resolve(__dirname, 'database.sqlite'),
  },
  migrations: {
    directory: resolve(__dirname, 'migrations'),
  },
  useNullAsDefault: true,
}
