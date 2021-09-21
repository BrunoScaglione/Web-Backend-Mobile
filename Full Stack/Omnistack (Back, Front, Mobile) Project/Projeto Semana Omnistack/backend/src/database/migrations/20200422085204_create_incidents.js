
// o que eu quero fazer nessa migracao
exports.up = function(knex) {

  return knex.schema.createTable('incidents', function(table) {
    // table.string('id').primary(); nesse caso nao precisamos de uma id complicada(segura) entao vamos fazer soh autoincrement
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    //relacionamentos
    table.string('ong_id').notNullable();

    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

// se eu quiser desfazer oq foi feito nessa migracao(famoso deu merda) 
exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};



