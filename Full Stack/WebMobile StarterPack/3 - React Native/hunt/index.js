
import {AppRegistry} from 'react-native';
import App from './src/'; // ele busca por index.js automaticamente
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
