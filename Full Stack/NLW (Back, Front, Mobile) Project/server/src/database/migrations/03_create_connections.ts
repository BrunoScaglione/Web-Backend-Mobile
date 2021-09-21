// vai armazenar informação se o usuário tentou entrar em contato com o proffy
import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('connections', table => {
    table.increments('id').primary();

    // relacionamento
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      // o que vai acontecer se esse id for alterado na tabela usuários? vai alterar tb
      .onUpdate('CASCADE')
      // vai deletar todas as aulas do professor s ele for deletado
      .onDelete('CASCADE');

    table.timestamp('created_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('connections');
}
