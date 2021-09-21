
/// todos os componentes vao se comunicar com o reduz que vai mudar o estado e passar essas info aos componentes

////////////// vamos dividir os reducers por funcionalidade da nossa aplicacao!
//// aqui por exemplo eh a funcionalidade de aulas e modulos ativos 

const INITIAL_STATE = {
  // activeLesson: null,
  // activeModule: null,
  activeLesson: {modules: null},
  activeModule: {modules: null},
  modules : [
    { 
      id: 1, 
      title: 'Iniciando com React', 
      lessons: [
        { id: 1, title: 'Primeira aula'},
        { id: 2, title: 'Segunda aula'},
      ],
    },
    {
      id: 2, 
      title: 'Aprendendo Redux', 
      lessons: [
        { id: 3, title: 'Terceira aula'},
        { id: 4, title: 'Quarta aula'},
      ],
    },
  ]
};

// estado vai assumir INITIAL_STATE quando inicializar
export default function course(state = INITIAL_STATE, action) {
  if (action.type === 'TOGGLE_LESSON') {
    return ({
       ...state, 
       activeLesson: action.lesson, 
       activeModule: action.module
    });
  }
  // IMPORTANTE: eu tinha esquecido de retornar o state por default, o reducer sempre tem que retornar o state!!
  // tinha dado problema de undefined justamente pq nao retornei
  return state;
}

