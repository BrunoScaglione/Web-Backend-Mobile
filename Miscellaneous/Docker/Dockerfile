# alpine eh uma versao leve do node
FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

# copia todas as pastas e arquivos do diretorio
COPY . .

# a porta do server
EXPOSE 3000

# o comando que precisa rodar pra startar a aplicacao
# separa em um array
CMD ["npm", "start"]

