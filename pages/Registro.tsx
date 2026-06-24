import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

export default function Registro() {
    const navigation = useNavigation<any>();
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signUpWithEmail = async () => {
        if (!email || !password || !nombre) {
            Alert.alert('Aviso', 'Por favor llena los campos obligatorios (Nombre, Correo, Contraseña)');
            return;
        }

        setLoading(true);
        const {
            data: { session, user },
            error,
        } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            Alert.alert('Error', error.message);
            setLoading(false);
            return;
        }

        if (user) {
            // Guardar nombre completo y teléfono en la tabla de perfiles
            const { error: profileError } = await supabase
                .from('perfiles')
                .update({ 
                    nombre_completo: `${nombre} ${apellidos}`.trim(),
                    telefono: telefono
                })
                .eq('id', user.id);

            if (profileError) {
                console.error('Error actualizando perfil:', profileError);
            }
        }

        if (!session) {
            Alert.alert('¡Casi listo!', 'Por favor revisa tu bandeja de entrada para verificar tu correo.');
            navigation.navigate('Login');
        }
        
        setLoading(false);
    };

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
                    <Ionicons name="person-add-outline" size={64} color="white" className="mb-2" />
                    <Text className="text-center text-gray-800 dark:text-white text-2xl font-serif font-bold px-4">
                        Únete a Crystal Cove
                    </Text>
                </ImageBackground>

                {/* FORMULARIO REGISTRO */}
                <View className="px-6 py-10">
                    <View className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-md border border-gray-200 dark:border-dark-surfaceAlt">
                        <Text className="text-xl font-bold text-blue-950 dark:text-gold mb-6 text-center font-sans">
                            Crear Cuenta
                        </Text>

                        {/* NOMBRE */}
                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 font-sans">Nombre(s) *</Text>
                            <View className="flex-row items-center bg-dark-bg border border-gray-200 dark:border-dark-surfaceAlt rounded-lg px-4 py-3">
                                <Ionicons name="person-outline" size={20} color="#6b7280" className="mr-3" />
                                <TextInput 
                                    placeholder="Ingresa tu nombre" 
                                    className="flex-1 text-base text-gray-800 dark:text-white"
                                    placeholderTextColor="#9ca3af"
                                    onChangeText={setNombre}
                                    value={nombre}
                                />
                            </View>
                        </View>

                        {/* APELLIDOS */}
                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 font-sans">Apellidos</Text>
                            <View className="flex-row items-center bg-dark-bg border border-gray-200 dark:border-dark-surfaceAlt rounded-lg px-4 py-3">
                                <Ionicons name="people-outline" size={20} color="#6b7280" className="mr-3" />
                                <TextInput 
                                    placeholder="Ingresa tus apellidos" 
                                    className="flex-1 text-base text-gray-800 dark:text-white"
                                    placeholderTextColor="#9ca3af"
                                    onChangeText={setApellidos}
                                    value={apellidos}
                                />
                            </View>
                        </View>

                        {/* TELÉFONO */}
                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 font-sans">Número de Teléfono</Text>
                            <View className="flex-row items-center bg-dark-bg border border-gray-200 dark:border-dark-surfaceAlt rounded-lg px-4 py-3">
                                <Ionicons name="call-outline" size={20} color="#6b7280" className="mr-3" />
                                <TextInput 
                                    placeholder="Ingresa tu teléfono" 
                                    keyboardType="phone-pad"
                                    className="flex-1 text-base text-gray-800 dark:text-white"
                                    placeholderTextColor="#9ca3af"
                                    onChangeText={setTelefono}
                                    value={telefono}
                                />
                            </View>
                        </View>

                        {/* CORREO ELECTRÓNICO */}
                        <View className="mb-4">
                            <Text className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 font-sans">Correo Electrónico *</Text>
                            <View className="flex-row items-center bg-dark-bg border border-gray-200 dark:border-dark-surfaceAlt rounded-lg px-4 py-3">
                                <Ionicons name="mail-outline" size={20} color="#6b7280" className="mr-3" />
                                <TextInput 
                                    placeholder="ejemplo@correo.com" 
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    className="flex-1 text-base text-gray-800 dark:text-white"
                                    placeholderTextColor="#9ca3af"
                                    onChangeText={setEmail}
                                    value={email}
                                />
                            </View>
                        </View>

                        {/* CONTRASEÑA */}
                        <View className="mb-6">
                            <Text className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 font-sans">Contraseña *</Text>
                            <View className="flex-row items-center bg-dark-bg border border-gray-200 dark:border-dark-surfaceAlt rounded-lg px-4 py-3">
                                <Ionicons name="lock-closed-outline" size={20} color="#6b7280" className="mr-3" />
                                <TextInput 
                                    placeholder="••••••••" 
                                    secureTextEntry
                                    autoCapitalize="none"
                                    className="flex-1 text-base text-gray-800 dark:text-white"
                                    placeholderTextColor="#9ca3af"
                                    onChangeText={setPassword}
                                    value={password}
                                />
                            </View>
                        </View>

                        {/* BOTÓN PRINCIPAL */}
                        <TouchableOpacity 
                            className="bg-gold-dark py-4 rounded-xl shadow-md w-full items-center mb-4"
                            disabled={loading}
                            onPress={signUpWithEmail}
                        >
                            {loading ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text className="text-gray-800 dark:text-white font-bold text-base font-sans">Registrarse</Text>
                            )}
                        </TouchableOpacity>

                        {/* CAMBIAR A LOGIN */}
                        <View className="flex-row justify-center items-center mt-2">
                            <Text className="text-gray-500 dark:text-gray-400 text-sm font-sans">
                                ¿Ya tienes una cuenta?
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')} className="ml-1">
                                <Text className="text-blue-700 font-bold text-sm font-sans">
                                    Inicia Sesión
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
