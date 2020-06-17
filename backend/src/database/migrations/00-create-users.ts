import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('name').notNullable()
    table.string('passsword').notNullable()
    table.string('card-indentifier', 19).notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users')
}
