import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../pages/Home';
import Habitaciones from '../pages/Habitaciones';
import Actividades from '../pages/Actividades';
import Reservas from '../pages/Reservas';
import Perfil from '../pages/Perfil';
import RoomDetails from '../pages/RoomDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HabitacionesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HabitacionesMain" component={Habitaciones} />
      <Stack.Screen name="RoomDetails" component={RoomDetails} />
    </Stack.Navigator>
  );
}

// Placeholder screens for other tabs
function PlaceholderScreen({ route }: { route: any }) {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <Text className="text-xl font-bold text-blue-950">{route.name}</Text>
    </View>
  );
}

export default function BottomMenu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'help-circle-outline';

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Habitaciones') {
            iconName = focused ? 'bed' : 'bed-outline';
          } else if (route.name === 'Actividades') {
            iconName = focused ? 'bicycle' : 'bicycle-outline';
          } else if (route.name === 'Reservas') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#172554', // blue-950
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Habitaciones" component={HabitacionesStack} />
      <Tab.Screen name="Actividades" component={Actividades} />
      <Tab.Screen name="Reservas" component={Reservas} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}
