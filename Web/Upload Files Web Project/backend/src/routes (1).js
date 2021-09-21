const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require("./config/multer");

const Post = require('./models/Post');

//listagem
routes.get("/posts", async (req, res) => {
  const posts = await Post.find();

  return res.json(posts);
});

// se quiser fazer upload de mais arquivos usa multer().array
// porem usando array nao da pra ver o progresso do upload
// da pra fazer upload de varios single e fica top
routes.post("/posts", multer(multerConfig).single("file"), async (req,res) => {
 // essa url a amazon gera pra gente, consegumos acessar a imagem por ela
  const { originalname: name, size, key, location: url = "" } = req.file;
  console.log(key);
  // id vai automatico pleo mongo como propriedade _id
  const post = await Post.create({
    name,
    size,
    key,
    url: "",
  })

  // obs: a gente vai receber uma propriedade "_v" que eh o versionamento, 
  // toda vez que ocorrer uma mudanca aumenta 1
  return res.json(post);
});

routes.delete('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);

  await post.remove();

  return res.send();
});

module.exports = routes;