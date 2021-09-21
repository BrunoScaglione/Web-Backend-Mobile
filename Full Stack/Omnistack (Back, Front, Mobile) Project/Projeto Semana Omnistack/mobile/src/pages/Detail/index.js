import React from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
// essa bibli tb da pra usar sem expo
import *  as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {

  const navigation = useNavigation();
  // esse cara serve pra gente pgar os dados que foram enviados pra nossa route atual(propriedade incident nesse caso, vindo da pagina incidents)
  const route = useRoute();
  const incident = route.params.incident;

  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`

  function navigateBack() {
    navigation.goBack()
  }

  // vai abrir um cliente de email com tudo jah preenchido, soh faltando preenccher o email que vai mandar
  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    })
  }

  // tem que testar no celular 
  function sendWhatsapp() {
    // deep linking 
    // ele vai abir o whatsapp coma mesagem jah pronta soh pra mandar
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}text=${message}`);
  }


  return (

    <View style={style.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
      {/* {marginTop: 0} vai sobreescrever a margin top do styles.incidentProperty estatico */}
        <Text style={styles.incidentProperty, {marginTop: 0}}>ONG:</Text>
        {/* <Text style={styles.incidentValue}>APAD</Text> estatico */}
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
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
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

