import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('classes', table => {
    table.increments('id').primary();
    table.string('subject').notNullable();
    table.decimal('cost').notNullable();

    // relacionamento
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      // o que vai acontecer se esse id for alterado na tabela usuários? vai alterar tb
      .onUpdate('CASCADE')
      // vai deletar todas as aulas do professor s ele for deletado
      .onDelete('CASCADE')

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('classes');
}
