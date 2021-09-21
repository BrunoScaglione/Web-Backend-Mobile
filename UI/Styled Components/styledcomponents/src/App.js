import React from 'react';

import { Title, TitleSmall } from './styles';

//Nao precisamos criar toda vez um styled component, criamos para blocos da nossa aplicacao
// fazendo com que a estilizacao seja aplicada no escopo daquele styled component
// ou seja todas as tags children dele a gente aplica estilizacao dentro daquele styled component

function App() {
    return ( 
      <div> 
        { /* <h1>Hello World</h1> */ } 
        <Title fontSize={50}> 
          Hello World
          <span>texto menor</span>
        </Title>

        <TitleSmall>Menor</TitleSmall>
      </div>
    );
}

export default App;