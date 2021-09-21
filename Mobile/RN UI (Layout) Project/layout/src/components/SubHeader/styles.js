import {StyleSheet} from 'react-native';
import { colors, metrics, fonts } from '../../styles';

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: metrics.padding,
      backgroundColor: colors.white,
      borderBottomWidth: 1,
      borderColor: colors.lighter
    },

    avatar: {
      width: 68,
      height: 68,
      borderRadius: 34,
      marginRight: metrics.padding,
    },

    profileInfo: {
      flex: 1, // pra essa parte ocupar o resto do layout
      fontSize: fonts.big,
      color: colors.darker,
    },

    name: {
      fontWeight: 'bold',
      fontSize: fonts.big,
      color: colors.darker,
      marginTop: 5,
    },

    bio: {
      fontSize: fonts.regular,
      color: colors.regular,
      marginTop: 5,
    },

    buttonContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },

    firstButton: {
      marginRight: 10,
    }
});

export default styles;