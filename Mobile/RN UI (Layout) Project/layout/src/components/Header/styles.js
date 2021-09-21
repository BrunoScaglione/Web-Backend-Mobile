import {StyleSheet} from 'react-native';
import {metrics, fonts, colors} from '../../styles';

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.white,
      height: metrics.headerHeight,
      paddingTop: metrics.headerPadding,
      paddingHorizontal: metrics.padding,
      borderBottomWidth: 1,
      borderColor: colors.lighter,
    },
    icon: {
      color: colors.primary
    },
    title: {
      fontSize: fonts.big
    }
});

export default styles;