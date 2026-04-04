import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import constants from 'expo-constants';
import './global.css';
import Home from './pages/Home';

export default function App() {
  return (
    <View style={{paddingTop: constants.statusBarHeight}} className="flex-1 items-center justify-center bg-green-600">
      <StatusBar style="auto" />
      <Home />
    </View>
  );
}