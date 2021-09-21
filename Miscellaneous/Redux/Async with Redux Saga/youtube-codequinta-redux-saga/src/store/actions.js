export function requestTodoList(text) {
  return {
    // veja que em vez de disparar uma action 'ADD_TODO' direto pro reducer,
    // vamos disparar um 'REQUEST_TODO_LIST' que vai para o middleware
    // e após passar pelo middleware, ai sim vamos diparar 'ADD_TODO' para o reducer
    type: 'REQUEST_TODO_LIST',
    // nesse caso soh tamo andando o type, mas eh commum mandar o payload junto, que sao outras
   // informacoes, ou propriedades do nosso payload
  // payload: {
  //  algumapropriedade:
  //  outraprpriedade:
  // }
  // outrinfo:
  // maisumainfo:
  }
}
