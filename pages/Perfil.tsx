import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useColorScheme } from 'nativewind';

export default function Perfil() {
    const { user, profile, role, signOut } = useAuth();
    const { colorScheme, toggleColorScheme } = useColorScheme();

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-dark-bg" edges={['top']}>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                
                {/* HERO BACKGROUND / HEADER */}
                <ImageBackground 
                    source={{ uri: 'https://images.unsplash.com/photo-1542314831-c6a4d1409e1e?auto=format&fit=crop&w=800&q=80' }} 
                    className="w-full h-48 justify-center items-center relative"
                    resizeMode="cover"
                >
                    <View className="absolute inset-0 bg-black/60" />
                    <Ionicons name="person-circle-outline" size={64} color="white" className="mb-2" />
                    <Text className="text-center text-white text-2xl font-serif font-bold px-4">
                        Mi Perfil
                    </Text>
                </ImageBackground>

                {/* INFO DE USUARIO */}
                <View className="px-6 py-10">
                    <View className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-md border border-gray-200 dark:border-dark-surfaceAlt">
                        <Text className="text-xl font-bold text-blue-950 dark:text-gold mb-6 text-center font-sans">
                            Datos Personales
                        </Text>

                        <View className="items-center mb-8">
                            <Text className="text-xl text-blue-950 dark:text-gold-light font-bold uppercase tracking-wider mb-1 font-sans">{role}</Text>
                            <Text className="text-2xl font-bold text-gray-800 dark:text-white text-center font-sans">{profile?.nombre_completo || 'Sin nombre'}</Text>
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 font-sans">Correo Electrónico</Text>
                            <Text className="text-lg text-gray-800 dark:text-white font-sans">{user?.email}</Text>
                        </View>

                        <View className="mb-6">
                            <Text className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 font-sans">Teléfono</Text>
                            <Text className="text-lg text-gray-800 dark:text-white font-sans">{profile?.telefono || 'No registrado'}</Text>
                        </View>

                        {/* TEMA (MODO OSCURO / CLARO) */}
                        <View className="flex-row justify-between items-center mb-8 bg-gray-50 dark:bg-dark-bg p-4 rounded-xl border border-gray-100 dark:border-dark-surfaceAlt">
                            <View className="flex-row items-center">
                                <Ionicons name={colorScheme === 'dark' ? 'moon' : 'sunny'} size={24} color={colorScheme === 'dark' ? '#d4af37' : '#172554'} className="mr-3" />
                                <Text className="text-gray-800 dark:text-white font-bold font-sans">
                                    Modo {colorScheme === 'dark' ? 'Oscuro' : 'Claro'}
                                </Text>
                            </View>
                            <Switch 
                                value={colorScheme === 'dark'}
                                onValueChange={toggleColorScheme}
                                trackColor={{ false: '#d1d5db', true: '#d4af37' }}
                                thumbColor={colorScheme === 'dark' ? '#ffffff' : '#ffffff'}
                            />
                        </View>

                        {/* BOTÓN CERRAR SESIÓN */}
                        <TouchableOpacity 
                            onPress={signOut}
                            className="bg-red-500 py-4 rounded-xl shadow-md w-full items-center"
                        >
                            <Text className="text-white font-bold text-base font-sans">Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* FOOTER */}
                <Footer />
                
            </ScrollView>
        </SafeAreaView>
    );
}
