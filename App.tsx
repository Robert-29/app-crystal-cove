import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomMenu from './components/BottomMenu';
import { AuthProvider } from './contexts/AuthContext';
import { StripeProvider } from '@stripe/stripe-react-native';
import './global.css';

// Reemplaza con tu Publishable Key real de Stripe
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51TlqBWPgwnq7bGzM0Bc91hxZzMAeMAjuhQVeAzGaPNPHAKnpERuhL3ZdkcSRi3kNywsxV2JKeSw8Q35HocGOLglv00toxjSKoU';

export default function App() {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <BottomMenu />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </StripeProvider>
  );
}