import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

export default function Perfil() {
    const { user, profile, role, signOut } = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
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
                    <View className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                        <Text className="text-xl font-bold text-blue-950 mb-6 text-center">
                            Datos Personales
                        </Text>

                        <View className="items-center mb-8">
                            <Text className="text-xl text-blue-600 font-bold uppercase tracking-wider mb-1">{role}</Text>
                            <Text className="text-2xl font-bold text-gray-800 text-center">{profile?.nombre_completo || 'Sin nombre'}</Text>
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 mb-1">Correo Electrónico</Text>
                            <Text className="text-lg text-gray-800">{user?.email}</Text>
                        </View>

                        <View className="mb-6">
                            <Text className="text-sm font-bold text-gray-700 mb-1">Teléfono</Text>
                            <Text className="text-lg text-gray-800">{profile?.telefono || 'No registrado'}</Text>
                        </View>

                        {/* BOTÓN CERRAR SESIÓN */}
                        <TouchableOpacity 
                            onPress={signOut}
                            className="bg-red-500 py-4 rounded-xl shadow-md w-full items-center mt-4"
                        >
                            <Text className="text-white font-bold text-base">Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* FOOTER */}
                <Footer />
                
            </ScrollView>
        </SafeAreaView>
    );
}
