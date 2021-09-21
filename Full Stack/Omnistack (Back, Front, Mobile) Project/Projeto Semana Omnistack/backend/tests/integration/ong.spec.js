const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

  beforeEach(async () => {
    // pra zerar o db antes de comecar um teste
    await connection.migrate.rollback();
    // equivalente ao comando do cmd npx knex migrate:latest
    await connection.migrate.latest();
  });

  // afterEach(() => {});

  // o jest dava erro pq a conexao ficava aberta
  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      // pra outras rotas que precis amandar coisa pelo header, exemplo abaixo:
    //.set('Authorization', 'idvalidodeumaONGaqui')
      .send({
        name: "APAD2",
        email: "contato@teste.com",
        whatsapp: "47000000000",
        city: "Rio do Sul",
        uf: "SC",
      })

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLenght(8);

    console.log(response.body)
  });
});