// o que eu quero fazer nessa migracao
exports.up = function(knex) {

  ///MUITO IMPORTANTE: tem que ter o return, eu tinha feito sem ele ai ele executou o migration dboa, como se tivesse
  // criado a table mas na vdd nao criou, ai deu mo trabalho pra deletar e fazer dnovo
  return knex.schema.createTable('ongs', function(table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); 
  });
};

// se eu quiser desfazer oq foi feito nessa migracao(famoso deu merda) 
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
