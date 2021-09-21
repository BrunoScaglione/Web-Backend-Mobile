import { delay } from 'redux-saga';
// sempre tem que usar yield antes desses efeitos
import { takeLatest, put, call, all, select } from 'redux-saga/effects';


//simulando uma api
function apiGet(text, length) {
  // acho que hoje em dia nao usa esse Promise, pq naao vi ninguem usando
  // tipo acho que daria pra usar umm async e await 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Fazer café' },
        { id: 2, text: 'Fazer café 2' },
        { id: 3, text: 'Fazer café 3' },
        { id: 4, text: 'Fazer café 4' },
      ]);
    }, 2000);
  });
}

// recebe o objeto da action, po exemplo se existvessemos mandando um payload na nossa action
// pegariamos ele aqui pra fazer alguma coisa com ele, ou uma chamada a api(call), ou mandar 
// uma action pro reducer (put)
function* getTodoList(/*action */) {
  try {
    // example anterior de "todos"
    //com select eu consigo informacoes do estado do redux
    //// const todos = yield select(state => state.todos)////

    // precisa usar o call pra chamar a funcao assincrona
    const response = yield call(apiGet, /* ex de parametro para a funcao apiGet: action.payload.text*/);
    // precisa usar put pra mandar a action para o reducer
    yield put({ type: 'SUCCESS_TODO_LIST', payload: { data: response } });
  } catch (err) {
    yield put({ type: 'FAILURE_TODO_LIST' });
  }
}

//sagas funcionam com base em generators do javascript ES6.
// O que são generators? São funcoes que vc consegue percorrer parte delas sem executar ela por inteiro
// Como fazer: crio com * após function, e quando eu quando eu  quiser que essa function pare em algum ponto
// a gente coloca o yield [] , e só quando o resultado que for feito depois do yield tiver concluído é que 
// o saga vai executar o resto do código

// eh comum criar um generator root com apenas um yield []

export default function* root() {
  // aqui estamos escutanndo todas as actions que tao sendo ennviadas com o nome "REQUEST_TODO_LIST"
  // que terao que passar pelo middlware(sagas)
  // ou seja essas actions estao sendo enviaadas para ca, para a gente fazer coisas assincronas aqui e depois
  // enviar uma action pro reducer

  //detalhe: "REQUEST_TODO_LIST" tb esta sendo ouvida diretamente pelo reducer, mas eh soh pra mudar o estado de loading 
  // pra true, que quer dizer que ela esa passando por aqui e ainda nao terminou. Ou seja essa action vai em paralelo pra ca 
  // e pro reducer.
  yield all([takeLatest("REQUEST_TODO_LIST", getTodoList)]); 
}

  // takeLatest --> se acao for executada mais vezes, enquanto a primeira acao ainda esta sendo feita(assincrona)
  // ele soh vai mandar a ultima acao
    // exemplo: cliente clica 10 vezes no botao pra salvar, nao queremos mandar todas essas acoes, soh uma
  // takeEvery --> se acao for executada mais vezes, enquanto a primeira acao ainda esta sendo feita(assincrona)
  // ele vai lembrar dessas acoes e meio q colocar elas em fila e mandar todas