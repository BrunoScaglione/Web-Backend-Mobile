import styled from 'styled-components';
// import styled from 'styled-components/native'; se for em React Native

// com isso, a sintaxe de estilizacao no React Native tb passa a ser igual a do css
// ou seja com ponto e vírgula, e sem precisar de string, e com nome com tracinho
// por exemplo:  alignItems: 'center', fica:
// igual no css: align-items: center;

//IMPORTANTE: da pra usar sem px os numeros, ou seja, em dp para React Native (que va fazer 
// co que a as distancias absolutas se mantenham em telas com desidades de pixel diferentes)
// lembrando que em uma tela de densidade media (160dp) 1px = 1dp
// porem telas de tamanhos diferentes, ainda precisamos de responsividade, mas eh traquilo, soh 
// fazer em relacao as dimensoes da window: 
// ex:
// import {Dimensions} from 'react-native'
// const width = Dimensions.get('window').width;
// ai faz em porcentagemm disso


export const Title = styled.h1`
  color: #F00;
  background: #000;
  font-size: ${props => `${props.fontSize}px`};

  span {
    font-size: 12px;
  }

`;

// styled(Title) esta herdando tudo que a gente usou no componente Title
export const TitleSmall =  styled(Title)`
  color: #00f;
  font-size: 16px;
`;