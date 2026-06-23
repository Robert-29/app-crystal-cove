import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';

export default function Reservas() {
    return (
        <SafeAreaView className="flex-1 bg-white flex flex-col" edges={['top']}>
            <View className="flex-1 justify-center items-center px-6">
                <View className="w-24 h-24 bg-blue-50 rounded-full justify-center items-center mb-6">
                    <Ionicons name="lock-closed-outline" size={48} color="#172554" />
                </View>
                
                <Text className="text-2xl font-serif text-blue-950 text-center mb-4">
                    Mis Reservaciones
                </Text>
                
                <Text className="text-center text-gray-500 mb-8 px-4">
                    Para poder ver el historial y los detalles de tus reservaciones, por favor inicia sesión con tu cuenta de Crystal Cove.
                </Text>
                
                <TouchableOpacity className="bg-blue-950 px-8 py-4 rounded-full shadow-md w-full max-w-[250px] flex-row justify-center items-center">
                    <Ionicons name="log-in-outline" size={20} color="white" className="mr-2" />
                    <Text className="text-white text-center font-bold text-base ml-2">Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>

            <Footer />
        </SafeAreaView>
    );
}
