import { StyleSheet } from 'react-native';

// importante: assimcomo na web a imagem nao se adapta ao tamanho que ela tem disponivel,
// tipo ela mantem o tamanho original, mas queremos que ela adapte

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257e5',
    justifyContent: 'center',
    // nao vamos por alignItems: 'center' pq vamos centralizar apenas
    // a imagem, e nao os outros elementos, entao mexeremos no style da Image soh  
    padding: 40
  },

  banner: {
    width: '100%',
    resizeMode: 'contain' // pra manter o ratio da img
  },

  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFF',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80
  },

  titleBold: {
    fontFamily: 'Poppins_600SemiBold',
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },

  button: {
    height: 150,
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between',
  },

  buttonPrimary: {
    backgroundColor: '#9871f5',
  },

  buttonSecondary: {
    backgroundColor: '#84d361'
  },

  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 20,
  },

  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#d4c2ff',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40,
  }
  
});

export default styles;