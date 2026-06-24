import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';

// Datos estáticos exportados para usarlos en la pantalla de detalles
export const ROOMS_DATA = [
    {
        id: 'suite-vista-mar',
        title: 'Suite Vista al Mar',
        description: 'Cama King size, balcón privado, jacuzzi y vistas panorámicas del océano. Ideal para una experiencia inolvidable.',
        price: 299,
        images: [
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1522771731478-44fb10e9a48f?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80'
        ],
        amenities: ['Mobiliario de lujo', 'Control climático', 'Wi-Fi de alta velocidad', 'Amenidades premium', 'Jacuzzi', 'Minibar']
    },
    {
        id: 'habitacion-deluxe',
        title: 'Habitación Deluxe',
        description: 'Amplia y elegante, con 2 camas dobles y acceso directo a la piscina.',
        price: 199,
        images: [
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80'
        ],
        amenities: ['2 camas dobles', 'Control climático', 'Wi-Fi de alta velocidad', 'Amenidades premium', 'TV 55"']
    },
    {
        id: 'villa-premium',
        title: 'Villa Premium',
        description: 'Privacidad total con piscina privada, servicio de mayordomo y terraza. Un escape perfecto del mundo exterior.',
        price: 499,
        images: [
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80'
        ],
        amenities: ['Piscina privada', 'Mayordomo', 'Control climático', 'Wi-Fi de alta velocidad', 'Amenidades premium']
    },
    {
        id: 'suite-presidencial',
        title: 'Suite Presidencial',
        description: 'El máximo lujo. Cuenta con sala de estar, comedor, dos habitaciones y terraza panorámica.',
        price: 899,
        images: [
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80'
        ],
        amenities: ['Sala y Comedor', 'Terraza panorámica', 'Control climático', 'Wi-Fi de alta velocidad', 'Servicio a la habitación 24/7']
    },
    {
        id: 'habitacion-familiar',
        title: 'Habitación Familiar',
        description: 'Espacio ideal para familias. Incluye una cama King, literas para niños y consola de videojuegos.',
        price: 259,
        images: [
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80'
        ],
        amenities: ['Cama King y Literas', 'Consola de videojuegos', 'Control climático', 'Wi-Fi de alta velocidad', 'Amenidades infantiles']
    },
    {
        id: 'bungalow-agua',
        title: 'Bungalow sobre el Agua',
        description: 'Acceso directo al mar, piso de cristal, ducha al aire libre y servicio de habitación 24/7 en bote.',
        price: 699,
        images: [
            'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80'
        ],
        amenities: ['Acceso al mar', 'Piso de cristal', 'Ducha al aire libre', 'Control climático', 'Wi-Fi de alta velocidad']
    }
];

export default function Habitaciones() {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-dark-bg" edges={['top']}>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                
                {/* ENCABEZADO */}
                <View className="py-10 px-4 items-center">
                    <Text className="text-3xl font-serif text-blue-950 dark:text-gold mb-4 text-center">Nuestras Habitaciones</Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-center mb-10 px-4 font-sans">
                        Descubre el lujo y el confort en cada una de nuestras exclusivas habitaciones y suites
                    </Text>

                    {/* AMENIDADES INCLUIDAS */}
                    <Text className="text-sm font-bold text-blue-950 dark:text-gold mb-6 text-center font-sans">Todas nuestras habitaciones incluyen:</Text>
                    <View className="flex-row flex-wrap justify-center w-full mb-8">
                        <View className="w-1/4 items-center px-2">
                            <Ionicons name="bed-outline" size={24} color="#d4af37" className="mb-2" />
                            <Text className="text-[10px] text-center text-blue-950 dark:text-gold font-sans">Mobiliario de lujo</Text>
                        </View>
                        <View className="w-1/4 items-center px-2">
                            <Ionicons name="thermometer-outline" size={24} color="#d4af37" className="mb-2" />
                            <Text className="text-[10px] text-center text-blue-950 dark:text-gold font-sans">Control climático</Text>
                        </View>
                        <View className="w-1/4 items-center px-2">
                            <Ionicons name="wifi-outline" size={24} color="#d4af37" className="mb-2" />
                            <Text className="text-[10px] text-center text-blue-950 dark:text-gold font-sans">Wi-Fi de alta velocidad</Text>
                        </View>
                        <View className="w-1/4 items-center px-2">
                            <Ionicons name="sparkles-outline" size={24} color="#d4af37" className="mb-2" />
                            <Text className="text-[10px] text-center text-blue-950 dark:text-gold font-sans">Amenidades premium</Text>
                        </View>
                    </View>
                </View>

                {/* LISTA DE HABITACIONES DINÁMICA */}
                <View className="px-4 pb-10 bg-dark-bg pt-8">
                    {ROOMS_DATA.map((room) => (
                        <View key={room.id} className="w-full bg-white dark:bg-dark-surface rounded-xl overflow-hidden mb-6 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt">
                            <Image source={{ uri: room.images[0] }} className="w-full h-56" />
                            <View className="p-5">
                                <Text className="font-bold text-blue-950 dark:text-gold text-xl mb-2 font-sans">{room.title}</Text>
                                <Text className="text-gray-500 dark:text-gray-400 text-sm mb-4 font-sans">{room.description}</Text>
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-blue-950 dark:text-gold font-bold text-lg font-sans">Desde ${room.price}/noche</Text>
                                    <TouchableOpacity 
                                        className="bg-gold-dark px-4 py-2 rounded-full"
                                        onPress={() => navigation.navigate('RoomDetails', { roomId: room.id })}
                                    >
                                        <Text className="text-gray-800 dark:text-white text-xs font-bold font-sans">Reservar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* FOOTER */}
                <Footer />

            </ScrollView>
        </SafeAreaView>
    );
}
