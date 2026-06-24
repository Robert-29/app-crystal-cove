import { View, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../pages/Home';
import Habitaciones from '../pages/Habitaciones';
import Actividades from '../pages/Actividades';
import Reservas from '../pages/Reservas';
import Perfil from '../pages/Perfil';
import RoomDetails from '../pages/RoomDetails';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Dashboard from '../pages/admin/Dashboard';
import ScannerQR from '../pages/admin/ScannerQR';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

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

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registro" component={Registro} />
    </Stack.Navigator>
  );
}

import AdminUserDetails from '../pages/admin/AdminUserDetails';

function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardMain" component={Dashboard} />
      <Stack.Screen name="AdminUserDetails" component={AdminUserDetails} />
    </Stack.Navigator>
  );
}

import { useColorScheme } from 'nativewind';

export default function BottomMenu() {
  const { session, role, isLoading } = useAuth();
  const { colorScheme } = useColorScheme();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-dark-surface">
        <ActivityIndicator size="large" color="#d4af37" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'help-circle-outline';

          if (route.name === 'Inicio') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Habitaciones') iconName = focused ? 'bed' : 'bed-outline';
          else if (route.name === 'Actividades') iconName = focused ? 'bicycle' : 'bicycle-outline';
          else if (route.name === 'Reservas') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';
          else if (route.name === 'Dashboard') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          else if (route.name === 'Escáner QR') iconName = focused ? 'qr-code' : 'qr-code-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colorScheme === 'dark' ? '#d4af37' : '#172554', // gold or dark blue
        tabBarInactiveTintColor: '#6b7280', // gray-500
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#0a0a0a' : '#ffffff',
          borderTopColor: colorScheme === 'dark' ? '#262626' : '#e5e7eb',
        },
        headerShown: false,
      })}
    >
      {session && (role === 'administrador' || role === 'staff') ? (
        // ADMIN / HOTEL STAFF TABS
        <>
          <Tab.Screen name="Dashboard" component={DashboardStack} />
          <Tab.Screen name="Escáner QR" component={ScannerQR} />
          <Tab.Screen name="Perfil" component={Perfil} />
        </>
      ) : (
        // GUEST TABS
        <>
          <Tab.Screen name="Inicio" component={Home} />
          <Tab.Screen name="Habitaciones" component={HabitacionesStack} />
          <Tab.Screen name="Actividades" component={Actividades} />
          <Tab.Screen name="Reservas" component={session ? Reservas : AuthStack} />
          <Tab.Screen name="Perfil" component={session ? Perfil : AuthStack} />
        </>
      )}
    </Tab.Navigator>
  );
}
