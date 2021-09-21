morgan eh um biblioteca pra fazer log de requisicoes http
multer eh middleware do express para as requisicoes com arquivos
>> yarn add express morgan mongoose multer

// vamos fazer o upload dos arquivos primeiro no servidor(pra mostrar soh) e depois pra amazon

// nas requisicoes tem que colcoar no body o Multipart pra mandar midia

// no name colca o mesmo nome (fieldname) que a gente definiu aqui:
multer(multerConfig).single('file')
// ou seja => file 

---------------------------

## agora vamos mandar pra amazon s3 e salavr essas imagens no mongodb:


docker ru e docker start diferenca:

This is a very important question and the answer is very simple, but fundamental:

Run: create a new container of an image, and execute the container. You can create N clones of the same image. The command is: docker run IMAGE_ID and not docker run CONTAINER_ID
enter image description here

Start: Launch a container previously stopped. For example, if you had stopped a database with the command docker stop CONTAINER_ID, you can relaunch the same container with the command docker start CONTAINER_ID, and the data and settings will be the same.

##### muito importante:

conexao mongodb com docker:

baixar imagem
>> docker pull tutum/mongodb
rodar container
>> docker run -d -p 27017:27017 -p 28017:28017 -e MONGODB_PASS="mypass" tutum/mongodb

listar containers
docker ps -a

startar container, se ele foi exitado antes
>> docker start [container id]


>> mongod
>> mongo


---------------------

a parte da amazon agora: obs( 12 meses gratuito)

1. acessar console.aws.amazon.com

2. criar conta

3. logar e acessar o servico do s3

4. criar um bucket

agora no vscode:

>> yarn add multer-s3

>> yarn add aws-sdk

## na aws:

procurar IAM (Identy and Access Management)

 > usuários  e cria um usuário

 tipo de acesso: acesso programatico 
 (da uma chaave de acesso e uma chave de acesso secreta pra acessar a api da aws)

 em definir permissoes> annexar politicas existentes de forma direta

 procura por por "s3" e escolhe a politica do s3 que eh:
 AmazonS3FullAccess e seleciona

 # importante: em permissoes: remover todas as opcoes que vjah vem marcadas 
 # que bloqueiama acesso publico

 -> ai recebemos a chave de acesso e a secreta

 >> yarn add dotenv

 pra testar o funcionamento do .env, ou seja mandando pro 's3'
 tem que reiniciar o servidor, pois o nodemon soh lida com jascript, 
 entao o .env ele nao atualizou




 -------------

 pra acessar pelo front :


 >> yarn add cors