import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';

export default function Habitaciones() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                
                {/* ENCABEZADO */}
                <View className="py-10 px-4 items-center">
                    <Text className="text-3xl font-serif text-blue-950 mb-4 text-center">Nuestras Habitaciones</Text>
                    <Text className="text-gray-500 text-center mb-10 px-4">
                        Descubre el lujo y el confort en cada una de nuestras exclusivas habitaciones y suites
                    </Text>

                    {/* AMENIDADES INCLUIDAS */}
                    <Text className="text-sm font-bold text-blue-950 mb-6 text-center">Todas nuestras habitaciones incluyen:</Text>
                    <View className="flex-row flex-wrap justify-center w-full mb-8">
                        <View className="w-1/4 items-center px-2">
                            <Ionicons name="bed-outline" size={24} color="#172554" className="mb-2" />
                            <Text className="text-[10px] text-center text-blue-950">Mobiliario de lujo</Text>
                        </View>
                        <View className="w-1/4 items-center px-2">
                            <Ionicons name="thermometer-outline" size={24} color="#172554" className="mb-2" />
                            <Text className="text-[10px] text-center text-blue-950">Control climático</Text>
                        </View>
                        <View className="w-1/4 items-center px-2">
                            <Ionicons name="wifi-outline" size={24} color="#172554" className="mb-2" />
                            <Text className="text-[10px] text-center text-blue-950">Wi-Fi de alta velocidad</Text>
                        </View>
                        <View className="w-1/4 items-center px-2">
                            <Ionicons name="sparkles-outline" size={24} color="#172554" className="mb-2" />
                            <Text className="text-[10px] text-center text-blue-950">Amenidades premium</Text>
                        </View>
                    </View>
                </View>

                {/* LISTA DE HABITACIONES */}
                <View className="px-4 pb-10 bg-gray-50 pt-8">
                    {/* Habitación 1 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-6 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <Text className="font-bold text-blue-950 text-xl mb-2">Suite Vista al Mar</Text>
                            <Text className="text-gray-500 text-sm mb-4">Cama King size, balcón privado, jacuzzi y vistas panorámicas del océano.</Text>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-green-600 font-bold text-lg">Desde $299/noche</Text>
                                <TouchableOpacity className="bg-blue-950 px-4 py-2 rounded-full">
                                    <Text className="text-white text-xs font-bold">Reservar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Habitación 2 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-6 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <Text className="font-bold text-blue-950 text-xl mb-2">Habitación Deluxe</Text>
                            <Text className="text-gray-500 text-sm mb-4">Amplia y elegante, con 2 camas dobles y acceso directo a la piscina.</Text>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-green-600 font-bold text-lg">Desde $199/noche</Text>
                                <TouchableOpacity className="bg-blue-950 px-4 py-2 rounded-full">
                                    <Text className="text-white text-xs font-bold">Reservar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Habitación 3 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-6 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <Text className="font-bold text-blue-950 text-xl mb-2">Villa Premium</Text>
                            <Text className="text-gray-500 text-sm mb-4">Privacidad total con piscina privada, servicio de mayordomo y terraza.</Text>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-green-600 font-bold text-lg">Desde $499/noche</Text>
                                <TouchableOpacity className="bg-blue-950 px-4 py-2 rounded-full">
                                    <Text className="text-white text-xs font-bold">Reservar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Habitación 4 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-6 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <Text className="font-bold text-blue-950 text-xl mb-2">Suite Presidencial</Text>
                            <Text className="text-gray-500 text-sm mb-4">El máximo lujo. Cuenta con sala de estar, comedor, dos habitaciones y terraza panorámica.</Text>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-green-600 font-bold text-lg">Desde $899/noche</Text>
                                <TouchableOpacity className="bg-blue-950 px-4 py-2 rounded-full">
                                    <Text className="text-white text-xs font-bold">Reservar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Habitación 5 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-6 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <Text className="font-bold text-blue-950 text-xl mb-2">Habitación Familiar</Text>
                            <Text className="text-gray-500 text-sm mb-4">Espacio ideal para familias. Incluye una cama King, literas para niños y consola de videojuegos.</Text>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-green-600 font-bold text-lg">Desde $259/noche</Text>
                                <TouchableOpacity className="bg-blue-950 px-4 py-2 rounded-full">
                                    <Text className="text-white text-xs font-bold">Reservar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Habitación 6 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-6 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <Text className="font-bold text-blue-950 text-xl mb-2">Bungalow sobre el Agua</Text>
                            <Text className="text-gray-500 text-sm mb-4">Acceso directo al mar, piso de cristal, ducha al aire libre y servicio de habitación 24/7 en bote.</Text>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-green-600 font-bold text-lg">Desde $699/noche</Text>
                                <TouchableOpacity className="bg-blue-950 px-4 py-2 rounded-full">
                                    <Text className="text-white text-xs font-bold">Reservar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* FOOTER */}
                <Footer />

            </ScrollView>
        </SafeAreaView>
    );
}
