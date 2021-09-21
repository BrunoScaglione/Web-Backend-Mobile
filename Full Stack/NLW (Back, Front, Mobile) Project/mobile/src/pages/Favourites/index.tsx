import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect} from '@react-navigation/native' 

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';

import styles from './styles';


function Favourites() {

  const [favorites, setFavorites] = useState([]);


  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(res => {
      if (res) {
        // aqui a gente salve todos os dados e nao soh os ids 
        const favoritedTeachers = JSON.parse(res);
        setFavorites(favoritedTeachers);
      }
    });
  }

  // excuta toda vez que a tela entrar em foco
  useFocusEffect(() => {
    loadFavorites();
  });
  
  return (
    <View style={styles.container}>  
      <PageHeader title="Meus proffys favoritos"/>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id}
              teacher={teacher}
              // jah entende como true
              favorited
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Favourites;