import {Platform} from 'react-native';

metrics = {
    padding: 15,
    ...Platform.select({
        // pq no ios a status bar nao conta como parte da tela, ai cobriria ela
        ios: {headerHeight: 64, headerPadding: 20},
        android: {headerHeight: 44, headerPadding: 0},
    }),
    tabBarHeight:  50,
};

export default metrics;