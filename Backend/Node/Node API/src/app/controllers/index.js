// esse arquivo foi criado pra exportar tudo de uma vez pra routes
// mas hoje em dia da pra usar o requireDir em vez de usar os modulos tipicos do node 
// fs e path

// mas vou fazer mesmo assim pra gente ver  só

// const fs = require('fs');
// const path = require('path');

// module.exports = {
    
//     const app = () =>  { fs.readdirSync(__dirname)
//         // todos os arquivos que nao comecam com . nem com index.js
//         .filter(file => ((file.indexOf('.') !== 0 && (file !== "index.js"))))
//         .forEach(file => require(path.resolve(__dirname, file))) 

//         // alguma coisa desse tipo
//     }
// }