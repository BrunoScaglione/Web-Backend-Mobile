-----------------------------------------
Deplot do backend:

# 1. colocar no github
  1.1 criar repositorio e copia url
  1.2 git init
  1.3 git remote add origin [url]

  antes de continuar:
    criar gitignore e colocar tudo que nao deve ir pro github

  1.4 git add --all
  1.5 git commit -m "nomedocommit"
  1.6 git push


# 2. Banco de dados:

  # o heroku nao tem a parte do mongodb de forma gratuita
  # mas banco relacional ele tem

  # vamos criar nosso mongo no cloud , mongo Atlas

  Criar db:

  2.1 Build a cluster
  2.2 Escolhe a regiao e create cluster
  2.3 Clica no cluster e vai e collections (que sao as "tabelas")
  2.4 craete database e a collection posts

  Liberar Acesso(ou restringir):

  2.5 Vai em Clusters entra em Security em IPWhiteList e agente libera o acesso com:
  2.6 Add Ip Adress e seleciona allow access from anywhere, caso vc queira pode colocar apenas o ip do servidor no heroku

  Criar Usuario:

  2.7 vamos em MongoDbUsers e seleciona add new user
  2.8 cria o usuario e define senha
  2.9 add user
  
  Agora vamos conectar com a base de dados:

  2.10 Overview e connect, selecionamos conect your application
  2.11 Seleciona short SRV connection string 
  2.22 copia a url de conexão, essa rl vai substituir a que a gente tinha 
  no localhost, mas vamos deixar pra alterar isto no heroku apenas, onde
  vao estar nossas variaveis abiente de producao
  ## importante: nesse link ta escrito admin e <PASSWORD> dentro dele
  # ai vai ter q substituir admin e <PASSWORD> pelo nosso usuario e senha criados
  # no Atlas respectivamente 

  # 3. Heroku

  obs: Ateh 5 aplicacoes de forma gratuita
  
  tem tutorial de deploy no nlw...

  temos quecriar um arquivo Procfile no backend
  eh um arquivo que soh o heroku entende que vai dizer
  ao kheroku qual comando ele preccisa executar para que nossa aplicacao inicie

    3.1 Criar Procfile na raiz do backend e colocar:

    web: yarn start

    isso significa que tod vez que ele identificar uma alteracao na nossa aplicacao
    pra ele rodar yarn start e subir ela dnovo

    isso eh necessario pois nao vamos usar o nodemon em producao

    # variaveis de ambiente:
    // pra pega o endreco vai em "open app" botao direito e copy link
    APP_URL = 
    MONGO_URL = 
    // lebrar que vai ser s3
    STORAGE_TYPE = 
    AWS_ACCESS_KEY_ID = 
    AWS_SECRET_ACCESS_KEY = 
    AWS_DEFAULT_REGION = 

  git add .

  git commit -m "adciona procfile"

  git push

  para achar erros de deploy, usar a cli do heroku:

  >> yarn add heroku-cli

  >> heroku logs

----------------------------------------------------
  ## Deploy do frontend:

  # tambem vamos fazer no heroku

  1 cria  nova aplicacao no heroku
  2 cria novo repositorio
  3 joga no github
    3.1 git init
    3.2 git remote origin "url_do_repositorio"
    3.2 git add .
    3.3 git commit
    3.4 git push

  4 Pra parte do react eh um pouco diferente, nao vai precisar do
  Procfile, pois o heroku tem os build-pack, sao uma serie de instrucoes criados pela comunidade que determinam como uma aplicacao deve funcionar. E existem build-pack pra esses pacotes mais comuns de desenvolvimento como: create-react-app
  e etc

  # configurar buil-pack
  > vai em settings> em build packs do lado tem um botao add buildpack e clicar nele

  ai vamos ter que colocar uma url:

  coloca essa do create-react-app: mars/create-react-app

  ## importante: quando usa create-react-app tem que deixar um prefixo em todas as variaveis ambiente lah no frontend.

  precisamos setar essa variavel ambiente:
  (pro endereco que a gente fez o servidor do backend no heroku)
  REACT_APP_API_URL

  agora vamos colcoar nossa aplicacao frontend dentro do heroku:

  vamos em >deploy em github e digita o nome do repositorio e conecta
  
  # importante: habilitar o enable automatic deploys

  obs: lembrar de colocar no gitignore o .env!

  obs: git st eh git status 

  faz a sequencia dos gits (remote, add, commit, push) denovo e pronto!


  obs: nessa aplicacao hospedamos o mongo numa localidade e os arquivos em outra
  e isso nao eh o idela e perde performance, o idela eh ter o banco de dados junto dos arquivos, mas eh pago no heroku entao ai nao deu


  ## imporante: para producao eh mt bom usar sentry para tratativas de erros





  




