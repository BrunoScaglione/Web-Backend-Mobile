import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DetailsScreen from './screens/Details';
import HomeScreen from './screens/Home';
import DashboardRoutes from './routes/dashboard.routes';
import {StatusBar} from 'react-native'

const Stack = createStackNavigator();
  
function Routes() {
    return (
        // <NavigationContainer> que vai me dar a propriedade navigation
        <NavigationContainer>
        {/* // da pra criar outros stacks ou componentes tb diferente do redux q soh pode um
        ele falou q no reduz tem q colocar o fragment pra centralizar etc*/}
        {/* // pra deixar o horario, icone de wifi, bateria tudo branco (porque o default eh preto) */}
        <StatusBar barStyle="light-content" />
        <Stack.Navigator 
            initialRouteName="Details"
            screenOptions={{
                // header: float, -- render a single header that stays at the top and animates as screens are changed (common pattern in ios)
                // header: screen, -- each screen has a header atached to it and the header fades in and out together with the screen (common pattern in andorid)
                // header: none, -- no header 

                headerTitleAlign: 'center',
                headerStyle: {backgroundColor: '#7159c1'},
                headerTintColor: '#FFF'
            }}
        >
            <Stack.Screen name="Something" component={DashboardRoutes} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;