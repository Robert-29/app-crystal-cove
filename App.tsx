import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomMenu from './components/BottomMenu';
import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <BottomMenu />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}