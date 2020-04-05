import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('captain_feelsgood_client', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('captain_feelsgood_client', { rootTag });
}
