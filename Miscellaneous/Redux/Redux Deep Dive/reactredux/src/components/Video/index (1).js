import React from 'react';

// import { Container } from './styles';

import { connect } from 'react-redux';

const Video = ({activeModule, activeLesson}) => (
  <div>
    {/* isso aqui deu erro na pois na primeira vez que roda activeModule ainda nao tem essas propriedades, soh depois
    que o usuario clica, na aula na sidebar */}
    {/* como vamos resolver? Simples, vamos iniciar activeLesson e activeModule como objetos vazios que da certo */}
    <strong>Módulo {activeModule.title}</strong>
    <span>Aula {activeLesson.title}</span>
  </div>
);

export default connect( state => ({
  activeLesson: state.course.activeLesson,
  activeModule: state.course.activeModule,
}))(Video);
