import { combineReducers} from 'redux';

import course from './course';
// import outroreduccer from './outroreducer';
// import maisumreducer  from './masi um reducer';

export default combineReducers({
  course,
  // outroreducer,
  // maisumreducer,
})

// vai tranformar nosso estado em um objeto que eh subdvidido por cada reducer como propriede
// nosso state vai ser assim agora:

// {
//   course: {modules: [], activeLesson: {}, activeModule: {}},
//   outroreducer: {umapropriedade: '', outrapropriedade: ''}
// }

