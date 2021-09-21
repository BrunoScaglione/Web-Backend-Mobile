import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationHelpersContext } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler'

import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';

function Landing() {

  const { navigate }= useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);

  // como não foi passado nada no Array, soh vai ser executada 
  //uma vez quando o componente for renderizado
  // a primeira vez
  useEffect(() => {
    api.get('connections').then(res => {
      const { total } = res.data;
      setTotalConnections(total);
    })
  }, []);

  function handleNavigatetoGiveClassesPage() {
    navigate('GiveClasses');
  }

  function handleNavigateToStudyPages() {
    navigate('Study');
  }

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'} 
        {/* O Text eh a única excessao à regra de herança de estilo no RN,
        por isso colocamos esse Text dentro do de cima */}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      {/* É legal usar RectButton em vez de TouchableOpacity nesse casos de botoes retangulares
      ele adapta o efeito do clique ao sistema operacional que o usuario ta usando 
      -> causa ripple no android por ex*/}
      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToStudyPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton 
          onPress={handleNavigatetoGiveClassesPage} 
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar Aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        {/* {' '} é pra dar um espacamento entre o texto e imagem */}
        Total de {totalConnections} conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>    
    </View>
  );
}

export default Landing;

