import React from 'react';

// import { Container } from './styles';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

// colocamos a actions em um aqrquivo separado
// que ta mandando essa funcao pra gente;
// export function toggleLesson(module, lesson) {
//   return {
//     type: 'TOGGLE_LESSON',
//     module,
//     lesson,
//   };
// };

import * as CourseActions from '../../store/actions/course'


const SideBar = ({modules, toggleLesson}) => (
  <aside>
    {modules.map(module => (
      <div key={module.id}>
        <strong>{module.title}</strong>
        <ul>
          {module.lessons.map(lesson => (
            <li key={lesson.id}>
              {lesson.title}
              <button onClick={() => toggleLesson(module, lesson)}>
                Selecionar
              </button>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </aside>
);


// isso aqui deixa nosso codigo mt mais limpo, tira as coisas de ddentro do componente

// funcao que recebe o estado e devolve o que a gente vai querer do estado em props
const mapStateToProps = state => ({
  modules: state.course.modules
});

// funcao que recebe o estado e devolve a uma funcao que vai ativar um dispatch em props
const mapDispatchToProps = dispatch => // ({
  // toggleLesson: (module, lesson) => dispatch(CourseActions.toggleLesson(module, lesson))
  // como os parametros que agente recebe sao iguaizinhos os que a agente ta passando na funcao 
  //de action da pra encurtar isso fazendo um bind
  bindActionCreators(CourseActions, dispatch)
  // basicamente essa linha jah abstari que eu quero passar minhas funcoes de action como prorpiedades
  // no qual o valor dessa propriedade vais ser uma funcao de dispatch que recebe como parametros os parametros da minha funcao de action e 
  // devolve um dispatch usando essa funcao
  

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);


