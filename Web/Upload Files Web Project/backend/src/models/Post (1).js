const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
// converte forma antiga de callbacks pra lidar com programacao assincrona
// para forma atual com async await -> promises
const {  promisify } = require('util');

const s3 = new aws.S3();

const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// funcionalidade de middleware do mongoose
// toda vez, antes de salvar uma info no db nesse schema
// a gente vai ver se a url ta vazia, se sim (salvando em disco, local), a gente vai colocar a estatica gerada 
// pelo express
// nao pode usar arrow function pq ele recebe essa instancia através do "this"
PostSchema.pre("save", function() {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

// antes de remover do banco de dados removemos do s3 na aws
// se tiver no s3 -> deletar no s3
// se for local -> deletar localmente
PostSchema.pre("remove", function() {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3.deleteObject({
      Bucket: 'nome_do_bucket',
      Key: this.key 
    }).promise() //por padrao eh callback , mas assim mongoose entende e espera terminar a promise
  } else {
    return promisify(fs.unlink)(
      // gera uma funcao de deletar baseada em promise, soh falta passar o parametro que eh // o local do arquivo
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
    ) 
  }
})

module.exports = mongoose.model("Post", PostSchema);