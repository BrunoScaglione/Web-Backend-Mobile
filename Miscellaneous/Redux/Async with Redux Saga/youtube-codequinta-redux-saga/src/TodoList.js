import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoActions from './store/actions';

const TodoList = ({ todos, requestTodoList }) => (
  <div>
    <ul>
      { todos.data.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      )) }
    </ul>
    <button onClick={() => requestTodoList()}>Carregar todos</button>
    { todos.loading && <p>Carregando...</p> }
  </div>
);

const mapStateToProps = state => ({
  // state.todos pq podemos ter varios reducers, entao poderia ter state.outroreducer
  // fizemos o combineReducers, lembra? soh olhar o index.js na pasta store, onde a gente cria o store,
  // roda o middleware(sagas) e exporta o store pro Provider compartilhar com os componentes
  todos: state.todos,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(TodoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
