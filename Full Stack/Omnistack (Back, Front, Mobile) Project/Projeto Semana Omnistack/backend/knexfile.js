// Update with your config settings.

module.exports = {


  // >> npx knex migrate:make [name_of_migration]  //ex: create_ongs eh o nome do arquivo de migration de criacao da tabela das ongs

  // >> npx knex migrate:latest

  //pra ver todos os comandos
  // >> npx knex

  //pra desfazer ultima migration
  // npx knex migrate:rollback


  // vamos usar esse agr
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  // ambiente que simula ambiante de producao pra que o time de desenvolvimento possa testar como se fosse em producao
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
