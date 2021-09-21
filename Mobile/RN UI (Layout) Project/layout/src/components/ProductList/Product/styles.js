import {StyleSheet, Dimensions} from 'react-native';
import {metrics, fonts, colors} from "../../../styles";

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      borderRadius: 3,
      marginBottom: metrics.padding,
      //IOS
      shadowColor: colors.light,
      shadowRadius: 2,
      shadowOpacity: 0.1,
      shadowOffset: {x: 0, y: 0},
      width: (width -45)/2,
      // android
      elevation: 0.5,
    },

    checkIcon: {
      position: 'absolute',
      right: 15 + metrics.padding,
      top: 2 + metrics.padding, // ajeitei soh pra ficar melhor com a foto do neymar
      color: colors.primary,
      zIndex: 1, // pra ficar em cima (bring to front)
    },

    imageContainer: {
      padding: metrics.padding,
    },

    image: {
      width: '100%',
      height: 100,
      resizeMode: 'contain', // vai fazer a imagem aumentar ou dimnuir prporcionalmente(sem distorcer)
      // pra satisfazer nossa condicao imposta de width
    },

    // pra fazer esse bordertop nao dava pra simplismente botar padding no container inteiro do Produto
    // pq ai essa linha tb ia ter padding, mas a gente quer que ela va ateh o final, entao teve que fazer duas views
    // a gent podou padding em uma view que engloba soh a imgame e em outra view que engloba as info
    infoContainer : {
      borderTopWidth: 1,
      borderColor: colors.lighter,
      padding: metrics.padding,
    },

    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: colors.darker,
    },

    description: {
      textAlign: 'center',
      color: colors.dark,
      fontSize: fonts.smaller,
    },

    price: {
      textAlign: 'center',
      color: colors.regular, // era pra ser light mas nao aparece
      fontSize: fonts.regular,
      marginTop: 5,
    },
});

export default styles;