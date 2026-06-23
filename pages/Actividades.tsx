import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';

export default function Actividades() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                
                {/* ENCABEZADO */}
                <View className="py-10 px-4 items-center">
                    <Text className="text-3xl font-serif text-blue-950 text-center">Actividades y Experiencias</Text>
                </View>

                {/* LISTA DE ACTIVIDADES */}
                <View className="px-4 pb-10 bg-gray-50 pt-4">
                    
                    {/* Actividad 1 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="moon-outline" size={24} color="#172554" className="mr-3" />
                                <Text className="font-bold text-blue-950 text-xl flex-shrink">Cenas Privadas a la Luz de la Luna</Text>
                            </View>
                            <Text className="text-gray-500 text-sm">Disfruta de una experiencia gastronómica única bajo el cielo estrellado, con un servicio personalizado y un menú exclusivo.</Text>
                        </View>
                    </View>

                    {/* Actividad 2 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="water-outline" size={24} color="#172554" className="mr-3" />
                                <Text className="font-bold text-blue-950 text-xl flex-shrink">Buceo</Text>
                            </View>
                            <Text className="text-gray-500 text-sm">Vive la emoción de explorar las profundidades marinas mientras disfrutas de vistas panorámicas incomparables del arrecife.</Text>
                        </View>
                    </View>

                    {/* Actividad 3 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="barbell-outline" size={24} color="#172554" className="mr-3" />
                                <Text className="font-bold text-blue-950 text-xl flex-shrink">Gimnasio</Text>
                            </View>
                            <Text className="text-gray-500 text-sm">Mantén tu rutina de ejercicios en nuestro gimnasio completamente equipado, abierto las 24 horas.</Text>
                        </View>
                    </View>

                    {/* Actividad 4 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="leaf-outline" size={24} color="#172554" className="mr-3" />
                                <Text className="font-bold text-blue-950 text-xl flex-shrink">Spa y Bienestar</Text>
                            </View>
                            <Text className="text-gray-500 text-sm">Relájate y rejuvenece en nuestro spa de clase mundial con tratamientos exclusivos y terapias holísticas.</Text>
                        </View>
                    </View>

                    {/* Actividad 5 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="restaurant-outline" size={24} color="#172554" className="mr-3" />
                                <Text className="font-bold text-blue-950 text-xl flex-shrink">Buffet</Text>
                            </View>
                            <Text className="text-gray-500 text-sm">Explora una amplia variedad de delicias culinarias en nuestro buffet internacional, preparado por chefs expertos.</Text>
                        </View>
                    </View>

                </View>

                {/* FOOTER */}
                <Footer />

            </ScrollView>
        </SafeAreaView>
    );
}
