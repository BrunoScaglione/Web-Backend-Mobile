import {StyleSheet} from 'react-native';
import { colors, metrics } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.5)',
    height: metrics.tabBarHeight,
    // paddingHorizontal: metrics.padding, jah temos space-around n precisa desse padding
    borderTopWidth: 1,
    borderColor: colors.lighter,
  },

  icon: {
    color: colors.regular, // era pra ser light mas n dava pra ver no emulador kkk
  },

  mainIcon: {
    color: colors.white
  },

  active: {
    color: colors.primary,
  },

  main: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;