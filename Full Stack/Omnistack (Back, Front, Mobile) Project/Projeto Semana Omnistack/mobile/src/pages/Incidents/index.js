import React, {useEffect} from 'react';
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
// nao vamos usar o button, pq ele jah vem com umas estilizacoes do andorios e ios
// e nao queremos isso agr
import {View, Image, Text, TouchableOpacity} from 'react-native';

// Importante: sempre vamos trabalhar com 3 tamanhos de logo diferentes
// que sao pra tres densidades de pixel diferentes padrao, 2x e 3x
// ai a gente coloca na pasta assets co os nomes: logo.png, logo@2x.png,
// logo@3x.png que quando a gente importar ele jah vai saber qual importar

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  // total de casos
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate('Detail', {incident});
  }

  async function loadIncidents() {

    // pra evitar que requisicoes sejam feita enquanto uma jah esta rolando
    // sem isso, se o usuario ficasse scrollando um monte pra baixo ia fazer uns par de requisicao, a gente n quer isso
    if (loading) {
      return;
    }

    if (total> 0 && incidents.lenght === total) {
      return;
    }

    setloading(true)

    // Esses dois jeitos abaixos sao equivalentes:
    const res = await api.get(`incidents?page=${page}`);
    // const res = await api.get('incidents', {
    //   params: {page}
    // });


    // anexando os incidents loadados com os que jah tavam(desestruturando dois arrays de objetos em um array grandao que anexa os dois)
    setIncidents([...incidents, ...res.data]);
    setTotal(res.headers['x-total-count']);
    setPage(page => page + 1)
    setloading(false)
  }

  useEffect(() => {
    loadIncidents;
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

      <FlatList
        // data={[1, 2, 3]} estatico 
        data={incidents}
        style={style.incidentList}
        // keyExtractor={incident => String(incident)} estatico
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2} // se ele tiver a 20% do final da lista, a gente vai carregar novos items
        // renderItem={() => ( 
        // renderItem recebe um objeto com varias coisas, mas estamos interessados apenas no item
        // item: incident só pra gente poder trabalhar com a variavel incident
        renderItem={({item: incident}) => ( 
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            {/* <Text style={styles.incidentValue}>APAD</Text> estatico */}
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            {/* <Text style={styles.incidentValue}>Cadelinha atropelada</Text> estatico */}
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            {/* <Text style={styles.incidentValue}>R$ 120,00</Text> estatico*/}
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency', 
                currency: 'BRL'})
                .format(incident.value)}
            </Text>

            <TouchableOpacity 
              style={styles.detailsButton} 
              onPress={() => navigateToDetail}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

