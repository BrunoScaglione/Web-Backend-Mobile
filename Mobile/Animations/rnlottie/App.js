
/// usando a animacao rocekt do lottie

import React from 'react';
import {View} from 'react-native';
import Lottie from 'lottie-react-native';

import rocket from  './rocket.json'

// import { Container } from './styles';

const App = () => {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Lottie autoSize resizeMode="contain" source={rocket} autoPlay loop />
    </View>
  );
};

export default App;

