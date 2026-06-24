import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';

export default function Actividades() {
    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-dark-bg" edges={['top']}>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                
                {/* ENCABEZADO */}
                <View className="py-10 px-4 items-center">
                    <Text className="text-3xl font-serif text-blue-950 dark:text-gold text-center">Actividades y Experiencias</Text>
                </View>

                {/* LISTA DE ACTIVIDADES */}
                <View className="px-4 pb-10 bg-dark-bg pt-4">
                    
                    {/* Actividad 1 */}
                    <View className="w-full bg-white dark:bg-dark-surface rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="moon-outline" size={24} color="#d4af37" className="mr-3" />
                                <Text className="font-bold text-blue-950 dark:text-gold text-xl flex-shrink font-sans">Cenas Privadas a la Luz de la Luna</Text>
                            </View>
                            <Text className="text-gray-500 dark:text-gray-400 text-sm font-sans">Disfruta de una experiencia gastronómica única bajo el cielo estrellado, con un servicio personalizado y un menú exclusivo.</Text>
                        </View>
                    </View>

                    {/* Actividad 2 */}
                    <View className="w-full bg-white dark:bg-dark-surface rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="water-outline" size={24} color="#d4af37" className="mr-3" />
                                <Text className="font-bold text-blue-950 dark:text-gold text-xl flex-shrink font-sans">Buceo</Text>
                            </View>
                            <Text className="text-gray-500 dark:text-gray-400 text-sm font-sans">Vive la emoción de explorar las profundidades marinas mientras disfrutas de vistas panorámicas incomparables del arrecife.</Text>
                        </View>
                    </View>

                    {/* Actividad 3 */}
                    <View className="w-full bg-white dark:bg-dark-surface rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="barbell-outline" size={24} color="#d4af37" className="mr-3" />
                                <Text className="font-bold text-blue-950 dark:text-gold text-xl flex-shrink font-sans">Gimnasio</Text>
                            </View>
                            <Text className="text-gray-500 dark:text-gray-400 text-sm font-sans">Mantén tu rutina de ejercicios en nuestro gimnasio completamente equipado, abierto las 24 horas.</Text>
                        </View>
                    </View>

                    {/* Actividad 4 */}
                    <View className="w-full bg-white dark:bg-dark-surface rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="leaf-outline" size={24} color="#d4af37" className="mr-3" />
                                <Text className="font-bold text-blue-950 dark:text-gold text-xl flex-shrink font-sans">Spa y Bienestar</Text>
                            </View>
                            <Text className="text-gray-500 dark:text-gray-400 text-sm font-sans">Relájate y rejuvenece en nuestro spa de clase mundial con tratamientos exclusivos y terapias holísticas.</Text>
                        </View>
                    </View>

                    {/* Actividad 5 */}
                    <View className="w-full bg-white dark:bg-dark-surface rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80' }} className="w-full h-56" />
                        <View className="p-5">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="restaurant-outline" size={24} color="#d4af37" className="mr-3" />
                                <Text className="font-bold text-blue-950 dark:text-gold text-xl flex-shrink font-sans">Buffet</Text>
                            </View>
                            <Text className="text-gray-500 dark:text-gray-400 text-sm font-sans">Explora una amplia variedad de delicias culinarias en nuestro buffet internacional, preparado por chefs expertos.</Text>
                        </View>
                    </View>

                </View>

                {/* FOOTER */}
                <Footer />

            </ScrollView>
        </SafeAreaView>
    );
}
