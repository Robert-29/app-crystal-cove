import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import BottomMenu from './components/BottomMenu';
import './global.css';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <BottomMenu />
    </NavigationContainer>
  );
}