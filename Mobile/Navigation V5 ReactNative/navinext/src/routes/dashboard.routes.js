import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// um componente qualquer, soh pra gente ver  o funcionamento da navegação
function WildCard({title}) {
    return <Text>WildCard {title}</Text>
}

export default function DashboardRoutes() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Something - Home" component={() => <WildCard title="Home"/>} />
            {/* o titulo vai continuar sendo Something porque a tela Something é pai e sobreescreve  o filho
            se eu quissesse mudar o titulo teria que acho mandar um params de volta e setar o titulo la como uma funcao que recebe os params
            olhar readme.md e documentacao q tem isso lah */}
            <Tab.Screen name="Something - Settings" component={() => <WildCard title="Settings"/>} />
        </Tab.Navigator>
    )
}