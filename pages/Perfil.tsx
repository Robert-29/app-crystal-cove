import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';

export default function Perfil() {
    const [isLogin, setIsLogin] = useState(true);

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
                        {isLogin ? 'Bienvenido a Crystal Cove' : 'Únete a Crystal Cove'}
                    </Text>
                </ImageBackground>

                {/* FORMULARIO */}
                <View className="px-6 py-10">
                    <View className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                        <Text className="text-xl font-bold text-blue-950 mb-6 text-center">
                            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                        </Text>

                        {!isLogin && (
                            <>
                                {/* NOMBRE */}
                                <View className="mb-4">
                                    <Text className="text-sm font-bold text-gray-700 mb-1">Nombre(s)</Text>
                                    <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                                        <Ionicons name="person-outline" size={20} color="#6b7280" className="mr-3" />
                                        <TextInput 
                                            placeholder="Ingresa tu nombre" 
                                            className="flex-1 text-base text-gray-800"
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>
                                </View>

                                {/* APELLIDOS */}
                                <View className="mb-4">
                                    <Text className="text-sm font-bold text-gray-700 mb-1">Apellidos</Text>
                                    <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                                        <Ionicons name="people-outline" size={20} color="#6b7280" className="mr-3" />
                                        <TextInput 
                                            placeholder="Ingresa tus apellidos" 
                                            className="flex-1 text-base text-gray-800"
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>
                                </View>

                                {/* TELÉFONO */}
                                <View className="mb-4">
                                    <Text className="text-sm font-bold text-gray-700 mb-1">Número de Teléfono</Text>
                                    <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                                        <Ionicons name="call-outline" size={20} color="#6b7280" className="mr-3" />
                                        <TextInput 
                                            placeholder="Ingresa tu teléfono" 
                                            keyboardType="phone-pad"
                                            className="flex-1 text-base text-gray-800"
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>
                                </View>
                            </>
                        )}

                        {/* CORREO ELECTRÓNICO */}
                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 mb-1">Correo Electrónico</Text>
                            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                                <Ionicons name="mail-outline" size={20} color="#6b7280" className="mr-3" />
                                <TextInput 
                                    placeholder="ejemplo@correo.com" 
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    className="flex-1 text-base text-gray-800"
                                    placeholderTextColor="#9ca3af"
                                />
                            </View>
                        </View>

                        {/* CONTRASEÑA */}
                        <View className="mb-6">
                            <Text className="text-sm font-bold text-gray-700 mb-1">Contraseña</Text>
                            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                                <Ionicons name="lock-closed-outline" size={20} color="#6b7280" className="mr-3" />
                                <TextInput 
                                    placeholder="••••••••" 
                                    secureTextEntry
                                    className="flex-1 text-base text-gray-800"
                                    placeholderTextColor="#9ca3af"
                                />
                            </View>
                        </View>

                        {/* BOTÓN PRINCIPAL */}
                        <TouchableOpacity className="bg-blue-950 py-4 rounded-xl shadow-md w-full items-center mb-4">
                            <Text className="text-white font-bold text-base">
                                {isLogin ? 'Entrar' : 'Registrarse'}
                            </Text>
                        </TouchableOpacity>

                        {/* CAMBIAR MODO (LOGIN / REGISTRO) */}
                        <View className="flex-row justify-center items-center mt-2">
                            <Text className="text-gray-500 text-sm">
                                {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                            </Text>
                            <TouchableOpacity onPress={() => setIsLogin(!isLogin)} className="ml-1">
                                <Text className="text-blue-700 font-bold text-sm">
                                    {isLogin ? 'Regístrate aquí' : 'Inicia Sesión'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* FOOTER */}
                <Footer />
                
            </ScrollView>
        </SafeAreaView>
    );
}
