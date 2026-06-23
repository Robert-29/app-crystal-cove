import React, { useRef } from 'react';
import { View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');

export default function Home() {
    const galleryRef = useRef(null);
    const scrollPosition = useRef(0);

    const scrollGallery = (direction) => {
        if (galleryRef.current) {
            const itemWidth = width - 80 + 16; // Image width + right margin
            if (direction === 'left') {
                scrollPosition.current = Math.max(0, scrollPosition.current - itemWidth);
            } else {
                scrollPosition.current = scrollPosition.current + itemWidth;
            }
            galleryRef.current.scrollTo({ x: scrollPosition.current, animated: true });
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* HERO SECTION */}
                <ImageBackground 
                    source={{ uri: 'https://images.unsplash.com/photo-1542314831-c6a4d1409e1e?auto=format&fit=crop&w=800&q=80' }} 
                    className="w-full h-96 justify-center items-center relative"
                    resizeMode="cover"
                >
                    <View className="absolute inset-0 bg-black/40" />
                    <Text className="text-center text-white text-3xl font-serif font-bold px-4 leading-tight">
                        EN{`\n`}CRYSTAL COVE{`\n`}ENCUENTRA{`\n`}EXPERIENCIA ÚNICA
                    </Text>
                </ImageBackground>

                {/* SERVICIOS Y AMENIDADES */}
                <View className="py-10 px-4 items-center">
                    <Text className="text-2xl font-serif text-blue-950 mb-8 text-center">Servicios y Amenidades</Text>
                    
                    <View className="flex-row flex-wrap justify-between w-full">
                        <View className="w-[48%] bg-gray-50 rounded-lg p-4 items-center mb-4 shadow-sm border border-gray-100">
                            <Ionicons name="wifi" size={32} color="#172554" className="mb-2" />
                            <Text className="font-bold text-center text-blue-950 mt-2">Wi-Fi Gratuito</Text>
                            <Text className="text-center text-xs text-gray-500 mt-1">Conexión de alta velocidad en todas las áreas</Text>
                        </View>
                        <View className="w-[48%] bg-gray-50 rounded-lg p-4 items-center mb-4 shadow-sm border border-gray-100">
                            <Ionicons name="cafe" size={32} color="#172554" className="mb-2" />
                            <Text className="font-bold text-center text-blue-950 mt-2">Desayuno Gourmet</Text>
                            <Text className="text-center text-xs text-gray-500 mt-1">Buffet internacional todas las mañanas</Text>
                        </View>
                        <View className="w-[48%] bg-gray-50 rounded-lg p-4 items-center mb-4 shadow-sm border border-gray-100">
                            <Ionicons name="barbell" size={32} color="#172554" className="mb-2" />
                            <Text className="font-bold text-center text-blue-950 mt-2">Gimnasio</Text>
                            <Text className="text-center text-xs text-gray-500 mt-1">Equipamiento moderno disponible 24/7</Text>
                        </View>
                        <View className="w-[48%] bg-gray-50 rounded-lg p-4 items-center mb-4 shadow-sm border border-gray-100">
                            <Ionicons name="restaurant" size={32} color="#172554" className="mb-2" />
                            <Text className="font-bold text-center text-blue-950 mt-2">Restaurante</Text>
                            <Text className="text-center text-xs text-gray-500 mt-1">Cocina internacional de primer nivel</Text>
                        </View>
                    </View>
                </View>

                {/* NUESTRAS HABITACIONES */}
                <View className="py-10 bg-gray-50 items-center px-4">
                    <Text className="text-2xl font-serif text-blue-950 mb-8 text-center">Nuestras Habitaciones</Text>
                    
                    {/* Habitación 1 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-6 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80' }} className="w-full h-48" />
                        <View className="p-4">
                            <Text className="font-bold text-blue-950 text-lg mb-1">Suite Vista al Mar</Text>
                            <Text className="text-gray-500 text-sm mb-3">Cama King size, balcón privado, jacuzzi y vistas panorámicas del océano.</Text>
                            <Text className="text-green-600 font-bold">Desde $299/noche</Text>
                        </View>
                    </View>

                    {/* Habitación 2 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-6 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80' }} className="w-full h-48" />
                        <View className="p-4">
                            <Text className="font-bold text-blue-950 text-lg mb-1">Habitación Deluxe</Text>
                            <Text className="text-gray-500 text-sm mb-3">Amplia y elegante, con 2 camas dobles y acceso directo a la piscina.</Text>
                            <Text className="text-green-600 font-bold">Desde $199/noche</Text>
                        </View>
                    </View>

                    {/* Habitación 3 */}
                    <View className="w-full bg-white rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-100">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80' }} className="w-full h-48" />
                        <View className="p-4">
                            <Text className="font-bold text-blue-950 text-lg mb-1">Villa Premium</Text>
                            <Text className="text-gray-500 text-sm mb-3">Privacidad total con piscina privada, servicio de mayordomo y terraza.</Text>
                            <Text className="text-green-600 font-bold">Desde $499/noche</Text>
                        </View>
                    </View>

                    <TouchableOpacity className="flex-row items-center bg-blue-950 px-6 py-3 rounded-full shadow-md">
                        <Text className="text-white text-base font-medium mr-2">Ver todas las habitaciones</Text>
                        <Ionicons name="arrow-forward" size={18} color="#ffffff" />
                    </TouchableOpacity>
                </View>

                {/* OFERTAS ESPECIALES */}
                <View className="py-10 px-4 items-center">
                    <Text className="text-2xl font-serif text-blue-950 mb-8 text-center">Ofertas Especiales</Text>
                    
                    <View className="w-full">
                        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm border border-gray-100 items-center w-full">
                            <Ionicons name="heart-outline" size={28} color="#172554" className="mb-3" />
                            <Text className="font-bold text-blue-950 text-lg mb-2 text-center">Escapada Romántica</Text>
                            <Text className="text-center text-sm text-gray-500 mb-3">Incluye cena a la luz de las velas, botella de champagne y decoración especial</Text>
                            <Text className="text-green-600 font-bold">Desde $399/noche</Text>
                        </View>
                        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm border border-gray-100 items-center w-full">
                            <Ionicons name="people-outline" size={28} color="#172554" className="mb-3" />
                            <Text className="font-bold text-blue-950 text-lg mb-2 text-center">Paquete Familiar</Text>
                            <Text className="text-center text-sm text-gray-500 mb-3">Habitación conectada para niños, actividades recreativas y desayuno incluido</Text>
                            <Text className="text-green-600 font-bold">Desde $499/noche</Text>
                        </View>
                        <View className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 items-center w-full">
                            <Ionicons name="calendar-outline" size={28} color="#172554" className="mb-3" />
                            <Text className="font-bold text-blue-950 text-lg mb-2 text-center">Estancia Prolongada</Text>
                            <Text className="text-center text-sm text-gray-500 mb-3">Descuentos especiales para reservas de 5 noches o más</Text>
                            <Text className="text-green-600 font-bold">15% de descuento</Text>
                        </View>
                    </View>
                </View>

                {/* GALERÍA CAROUSEL */}
                <View className="py-10 bg-gray-50 items-center relative">
                    <Text className="text-2xl font-serif text-blue-950 mb-8 text-center">Galería</Text>
                    
                    <View className="w-full relative px-10">
                        <ScrollView 
                            ref={galleryRef}
                            horizontal 
                            showsHorizontalScrollIndicator={false} 
                            className="w-full"
                            contentContainerStyle={{ alignItems: 'center' }}
                            onScroll={(e) => {
                                scrollPosition.current = e.nativeEvent.contentOffset.x;
                            }}
                            scrollEventThrottle={16}
                        >
                            <Image source={{ uri: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=400&q=80' }} className="h-48 rounded-xl mr-4" style={{ width: width - 80 }} />
                            <Image source={{ uri: 'https://images.unsplash.com/photo-1522771731478-44fb10e9a48f?auto=format&fit=crop&w=400&q=80' }} className="h-48 rounded-xl mr-4" style={{ width: width - 80 }} />
                            <Image source={{ uri: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80' }} className="h-48 rounded-xl mr-4" style={{ width: width - 80 }} />
                            <Image source={{ uri: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=400&q=80' }} className="h-48 rounded-xl" style={{ width: width - 80 }} />
                        </ScrollView>

                        {/* Flechas de navegación */}
                        <TouchableOpacity 
                            onPress={() => scrollGallery('left')}
                            className="absolute left-2 top-1/2 -translate-y-6 bg-white/80 rounded-full p-2 shadow-sm"
                        >
                            <Ionicons name="chevron-back" size={24} color="#172554" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            onPress={() => scrollGallery('right')}
                            className="absolute right-2 top-1/2 -translate-y-6 bg-white/80 rounded-full p-2 shadow-sm"
                        >
                            <Ionicons name="chevron-forward" size={24} color="#172554" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* EXPERIENCIAS (TESTIMONIALS) */}
                <View className="py-10 px-4 items-center">
                    <Text className="text-2xl font-serif text-blue-950 mb-2 text-center">Experiencias Crystal Cove</Text>
                    <Text className="text-gray-500 text-center mb-8">Lo que dicen nuestros huéspedes</Text>
                    
                    <View className="w-full">
                        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm border border-gray-100 items-center w-full">
                            <View className="w-16 h-16 rounded-full bg-blue-100 mb-4 justify-center items-center overflow-hidden">
                                <Image source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' }} className="w-full h-full" />
                            </View>
                            <Text className="text-center text-sm text-gray-500 italic mb-4">"Una experiencia inolvidable. El servicio y las instalaciones superaron todas mis expectativas."</Text>
                            <Text className="font-bold text-blue-950 text-sm">María González</Text>
                            <Text className="text-xs text-gray-400">Huésped Frecuente</Text>
                        </View>
                        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm border border-gray-100 items-center w-full">
                            <View className="w-16 h-16 rounded-full bg-blue-100 mb-4 justify-center items-center overflow-hidden">
                                <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' }} className="w-full h-full" />
                            </View>
                            <Text className="text-center text-sm text-gray-500 italic mb-4">"El mejor hotel para combinar trabajo y descanso. El ambiente es perfecto para la concentración."</Text>
                            <Text className="font-bold text-blue-950 text-sm">Carlos Ruiz</Text>
                            <Text className="text-xs text-gray-400">Viajero de Negocios</Text>
                        </View>
                        <View className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 items-center w-full">
                            <View className="w-16 h-16 rounded-full bg-blue-100 mb-4 justify-center items-center overflow-hidden">
                                <Image source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' }} className="w-full h-full" />
                            </View>
                            <Text className="text-center text-sm text-gray-500 italic mb-4">"Nuestra estancia fue mágica. Cada detalle estaba cuidadosamente pensado para hacer nuestra experiencia especial."</Text>
                            <Text className="font-bold text-blue-950 text-sm">Ana Martínez</Text>
                            <Text className="text-xs text-gray-400">Luna de Miel</Text>
                        </View>
                    </View>
                </View>

                {/* CONTACTO */}
                <View className="py-10 bg-gray-50 items-center px-4">
                    <Text className="text-2xl font-serif text-blue-950 mb-8 text-center">Contacto</Text>
                    
                    <View className="w-full bg-white rounded-xl p-6 mb-4 shadow-sm border border-gray-100 items-center">
                        <Ionicons name="location-outline" size={24} color="#172554" className="mb-2" />
                        <Text className="font-bold text-blue-950 mb-1">Ubicación</Text>
                        <Text className="text-center text-xs text-gray-500">Blvd. Kukulcan Km 10,{`\n`}Zona Hotelera, Cancún, Q.R.</Text>
                    </View>
                    
                    <View className="w-full bg-white rounded-xl p-6 mb-4 shadow-sm border border-gray-100 items-center">
                        <Ionicons name="call-outline" size={24} color="#172554" className="mb-2" />
                        <Text className="font-bold text-blue-950 mb-1">Teléfono</Text>
                        <Text className="text-center text-xs text-gray-500">+52 55 4904 0246{`\n`}+1 234 567 890</Text>
                    </View>
                    
                    <View className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 items-center">
                        <Ionicons name="mail-outline" size={24} color="#172554" className="mb-2" />
                        <Text className="font-bold text-blue-950 mb-1">Email</Text>
                        <Text className="text-center text-xs text-gray-500">info@crystalcove.com{`\n`}reservas@crystalcove.com</Text>
                    </View>
                </View>

                {/* FOOTER */}
                <Footer />

            </ScrollView>
        </SafeAreaView>
    );
}