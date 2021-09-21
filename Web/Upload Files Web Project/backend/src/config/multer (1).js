const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    // temos que garantir que as imagens tenham nomes unicos
    // vamos anezar uma hash no incio do nome de cada imagem
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        // se der errro repassa pro callback que vai mostrar o erro
        if (err) cb(err);
        // connverter pra hexadecimal
        // file.originalname eh o nome que o usuario deu upload
        // mudaos aqui de filename para file.key pra se for no local ou s3
        // a gente ter a mesma propriedade file.key pra pegar o nome do arquivo
        file.key = `${hash.toString('hex')}-${file.originalname}`.split(' ').join('_');
        cb(null, file.key);
      });
    }
  }),

  s3: multerS3({
    // aqui teria que colocar todas as cnfiguracoes, mas a gente
    // jah definiu nas variaveis de ambiente que sao lidas lah no index, o
    // multer consegue estabelcer essa comunicacao automaticamente
    s3: new aws.S3(),
    bucket: 'nome_do_bucket_dentro_da_aws_s3',
    // sem ele , todo arquivo que joga no s3, se um usuario de fora acessar ele
    // vaia utomaticamente fazer o download pq esse arquivo nao seria legivel pelo navegador
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // por default os arquivos nao tem permissao de leitura
    acl: 'public-read',
    // mesma coisa que o filename que a gente tem no local
    // nome da imagem que vai ser gravada no s3
    // agora o nome da imagem ve em req.file.key 
    key: (req, file, cb) => {
      (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          // se der errro repassa pro callback que vai mostrar o erro
          if (err) cb(err);
          // connverter pra hexadecimal
          // file.originalname eh o nome que o usuario deu upload

          // aqui nao precisa trocar por file.key pq o s3 vai definir automaticamente como key
          const fileName = `${hash.toString('hex')}-${file.originalname}`;
  
          cb(null, fileName);
        });
      }
    },
  }),
};

module.exports = {
  // dest: eh tipo soh um faalback pra caso a gente nao tivesse defiido o destination dentro
  // do storage // mema coisa
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2*1024*1024 // 2mb 
  },
  fileFilter: (req, file, cb) => {
    // cb = callback
    // filtra os arquivos enviados
    const allowedMimes = 
    [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      // primeiro parametro do cb eh erro
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
};