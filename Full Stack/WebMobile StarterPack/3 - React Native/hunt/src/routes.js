/// o react navigation mudou pra versao 5 e nao ta rodando a versao anterior 
/// entao vo fazer o exemplo sem rodar mesmo e depois vejo a versao 5 no rocketseat
// entao nao espere que esse código rode, mas vai ser bom pra entender os conceitos

import {createStackNavigator} from 'react-navigation';
// navegacao de stack -- por clicks em botoes 

import Main from './pages/main';
import Product from './pages/product';


// ele acabou nao explicando o navigation, pra quando a gente tiver varias paginas
export default createStackNavigator({
    Main,
    Product,
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#DA552F"
        },
        headerTintColor: "#FFF"
    },
});



