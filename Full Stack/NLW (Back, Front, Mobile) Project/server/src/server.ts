// importante: antes de desenvolver a aplicação é preciso identificar
// os casos de useLocation, pelo layout é uma boa forma

// precisa de yarn add @types/express -D pq express n eh feito em typescript
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
// faz conversão pra objeto javascript, um middleware
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333)

