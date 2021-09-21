import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('class_schedule', table => {
    table.increments('id').primary();

    table.integer('week_day').notNullable();
    table.integer('from').notNullable();
    table.integer('to').notNullable();

    // relacionamento
    table.integer('class_id')
      .notNullable()
      .references('id')
      .inTable('classes')
      // o que vai acontecer se esse id for alterado na tabela usuários? vai alterar tb
      .onUpdate('CASCADE')
      // vai deletar todas as aulas do professor s ele for deletado
      .onDelete('CASCADE')

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('class_schedule');
}
