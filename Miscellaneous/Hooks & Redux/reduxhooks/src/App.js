import React from 'react';
import {Provider} from 'react-redux';

import store from './store';
import CourseList from './components/CourseList';

function App() {
  return (
    // todos os componentes dentro do componente Provider vao ter acesso as informacoes de {store}
    // Importante: dentro do provider só pode ter 1 componente, o diego falou em outro video
    <Provider store={store}>
      <div className="App">
        <CourseList />
      </div>
    </Provider>
  );
}

export default App;
