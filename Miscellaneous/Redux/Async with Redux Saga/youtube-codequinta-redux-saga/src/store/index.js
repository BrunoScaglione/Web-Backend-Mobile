import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// vamos suporque eu quero que o usuario clica no botao de add todo, mas soh apos 2 segundos seja adicioanda
// um todo pra ele. Como fazer?
// Primeir opcão --> fazer um setTime out no componente e depois fazer o dispatch normal da acao
//  mas nao eh uma opcao boa, pois se eu tiver essa mesma ecao em outrs lugareseu vou ter que ficar fazendo timeout em varios lugares
// Solucao: vamos dar despatch nessa acoes normalmente, porem antes delas chegarem no reducer, vao todas
// passar pelo nosso middleware(sagas) onde vao sofrer um time out para entao chegarem no reducer
// Importante: o Reducer nao  pode ter coisas assincronas nele !! entao por isso que nao era um opcao

import todos from './reducer';

// pegando nossos sagas
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    todos,
  }),
  // apenas passamos esse parametro a mais
  applyMiddleware(sagaMiddleware),
);

// rodando o sagamiddlware com os nossos sagas
sagaMiddleware.run(rootSaga);

export default store;
