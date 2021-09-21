const express= require('express');
const graphqlHTTP = require('express-graphql');
// sem ele tinha dado erro na requicao vinda de outro lugar (frontend)
const cors = require('cors');
const schema = require('./schema');


const app = express();

//Alow cross-origin
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  // graphiql is the tool that we can use as our client to make queries to our server
  graphiql: true
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

