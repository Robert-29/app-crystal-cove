import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../pages/Home';
import Habitaciones from '../pages/Habitaciones';
import React from 'react';

const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Habitaciones" component={Habitaciones} />
      <Tab.Screen name="Actividades" component={PlaceholderScreen} />
      <Tab.Screen name="Reservas" component={PlaceholderScreen} />
      <Tab.Screen name="Perfil" component={PlaceholderScreen} />
    </Tab.Navigator>
  );
}
