const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const {page = 1} = req.query;

    // queremos mandar para o frontend o total de casos
    // ta me devolvendo o array de objeto, e tamo desestruturando pra pegar o objeto
    // ex: retorna { 'count(*)': 12 }
    // e vamos mandar isso no header da resposta
    const [count] =  await connection('incidents').count();

    console.log(count);

    const incidents = await connection('incidents')
      // quando listarmos as ifo de um caso, tb queremos listar as info da ong que fez esse caso
      // esse join vai anexar essas info pra gente
      // queremos pegar os dados da tabela 'ongs' apenas onde 'ongs.id' é igual a incidents.ong_id
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1)*5)
      // deixando soh .select('*'); ele sobrepunha o id da ong em cima do id do incidente(pq o nome do campo eh igual)
      .select([
        'incidents.*', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf',
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents)
  },

  async create(req, res) {
    const {title, description, value} = req.body;
    // no headervamos colocar a autorizacao que vai ser o id da ong que ta criando esse caso
    // headers: {Authorization: [id da ong aqui] }
    // tudo que for contexto da requisicao via no header(autorizaccao, coisa de mudar de idioma etc)
    const ong_id = req.headers.authorization;

    // desestruturacao, quermos soh o id, a primeira chave 
    // lembrando que esse id ta sendo automaticamente gerado(1,2,3...)
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.json({id})
  },

  async delete(req, res) {
    const {id} = req.params;
    // garantir que a uma ong só possa deletar um caso de sua propria ong
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id != ong_id) {
      // 401 eh nao autorizado
      return res.status(401).json({error: 'Operation not permitted'});
    }

    await connection('incidents').where('id', id).delete();
    // 204 eh resposta que deu sucesso mas nao retorna conteúdo
    return res.status(204).send();
  },

};