import React, { useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

export default function Home() {
    const { width, height } = useWindowDimensions();
    const galleryRef = useRef(null);
    const scrollPosition = useRef(0);
    const scrollViewRef = useRef(null);

    const scrollGallery = (direction) => {
        if (galleryRef.current) {
            const itemWidth = width - 80 + 16;
            if (direction === 'left') {
                scrollPosition.current = Math.max(0, scrollPosition.current - itemWidth);
            } else {
                scrollPosition.current = scrollPosition.current + itemWidth;
            }
            galleryRef.current.scrollTo({ x: scrollPosition.current, animated: true });
        }
    };

    return (
        <View style={{ flex: 1 }} className="bg-gray-50 dark:bg-dark-bg">
            <ScrollView ref={scrollViewRef} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                {/* HERO FULLSCREEN */}
                <View style={{ width, height, backgroundColor: '#0a0a0a' }}>
                    {/* Imagen de fondo */}
                    <Image
                        source={{ uri: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800' }}
                        style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}
                        resizeMode="cover"
                        onError={(e) => console.log('Image error:', e.nativeEvent.error)}
                    />

                    {/* Overlay oscuro */}
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.42)' }} />

                    {/* Contenido centrado */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
                        {/* Badge de ubicación */}
                        <View style={{
                            borderWidth: 1,
                            borderColor: 'rgba(255,255,255,0.7)',
                            paddingHorizontal: 16,
                            paddingVertical: 6,
                            borderRadius: 999,
                            marginBottom: 24
                        }}>
                            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11, letterSpacing: 3, fontWeight: '600', textTransform: 'uppercase' }}>
                                Cancún, México
                            </Text>
                        </View>

                        {/* Nombre del hotel */}
                        <Text style={{
                            color: 'white',
                            fontSize: 48,
                            fontWeight: '800',
                            textAlign: 'center',
                            letterSpacing: 4,
                            textShadowColor: 'rgba(0,0,0,0.6)',
                            textShadowOffset: { width: 0, height: 2 },
                            textShadowRadius: 10,
                            marginBottom: 4
                        }}>
                            CRYSTAL
                        </Text>
                        <Text style={{
                            color: 'white',
                            fontSize: 48,
                            fontWeight: '800',
                            textAlign: 'center',
                            letterSpacing: 4,
                            textShadowColor: 'rgba(0,0,0,0.6)',
                            textShadowOffset: { width: 0, height: 2 },
                            textShadowRadius: 10,
                            marginBottom: 24
                        }}>
                            COVE
                        </Text>

                        {/* Separador decorativo */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <View style={{ width: 40, height: 1, backgroundColor: 'rgba(255,255,255,0.5)' }} />
                            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.7)', marginHorizontal: 8 }} />
                            <View style={{ width: 40, height: 1, backgroundColor: 'rgba(255,255,255,0.5)' }} />
                        </View>

                        {/* Slogan */}
                        <Text style={{
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: 15,
                            textAlign: 'center',
                            letterSpacing: 1,
                            marginBottom: 44,
                            fontStyle: 'italic',
                        }}>
                            Encuentra tu experiencia única
                        </Text>

                        {/* Botón CTA */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'white',
                                paddingHorizontal: 36,
                                paddingVertical: 14,
                                borderRadius: 999,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 6,
                                elevation: 6,
                            }}
                            onPress={() => scrollViewRef.current?.scrollTo({ y: height, animated: true })}
                        >
                            <Text style={{ color: '#172554', fontWeight: 'bold', fontSize: 15, letterSpacing: 0.5 }}>
                                Descubrir más
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Indicador de scroll */}
                    <View style={{ position: 'absolute', bottom: 32, left: 0, right: 0, alignItems: 'center' }}>
                        <Ionicons name="chevron-down" size={28} color="rgba(255,255,255,0.7)" />
                    </View>
                </View>


                {/* SERVICIOS Y AMENIDADES */}
                <View className="py-10 px-4 items-center">
                    <Text className="text-2xl font-serif text-blue-950 dark:text-gold mb-8 text-center">Servicios y Amenidades</Text>
                    
                    <View className="flex-row flex-wrap justify-between w-full">
                        <View className="w-[48%] bg-gray-50 dark:bg-dark-bg rounded-lg p-4 items-center mb-4 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt">
                            <Ionicons name="wifi" size={32} color="#d4af37" className="mb-2" />
                            <Text className="font-bold text-center text-blue-950 dark:text-gold mt-2 font-sans">Wi-Fi Gratuito</Text>
                            <Text className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1 font-sans">Conexión de alta velocidad en todas las áreas</Text>
                        </View>
                        <View className="w-[48%] bg-gray-50 dark:bg-dark-bg rounded-lg p-4 items-center mb-4 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt">
                            <Ionicons name="cafe" size={32} color="#d4af37" className="mb-2" />
                            <Text className="font-bold text-center text-blue-950 dark:text-gold mt-2 font-sans">Desayuno Gourmet</Text>
                            <Text className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1 font-sans">Buffet internacional todas las mañanas</Text>
                        </View>
                        <View className="w-[48%] bg-gray-50 dark:bg-dark-bg rounded-lg p-4 items-center mb-4 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt">
                            <Ionicons name="barbell" size={32} color="#d4af37" className="mb-2" />
                            <Text className="font-bold text-center text-blue-950 dark:text-gold mt-2 font-sans">Gimnasio</Text>
                            <Text className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1 font-sans">Equipamiento moderno disponible 24/7</Text>
                        </View>
                        <View className="w-[48%] bg-gray-50 dark:bg-dark-bg rounded-lg p-4 items-center mb-4 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt">
                            <Ionicons name="restaurant" size={32} color="#d4af37" className="mb-2" />
                            <Text className="font-bold text-center text-blue-950 dark:text-gold mt-2 font-sans">Restaurante</Text>
                            <Text className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1 font-sans">Cocina internacional de primer nivel</Text>
                        </View>
                    </View>
                </View>

                {/* NUESTRAS HABITACIONES */}
                <View className="py-10 bg-gray-50 dark:bg-dark-bg items-center px-4">
                    <Text className="text-2xl font-serif text-blue-950 dark:text-gold mb-8 text-center">Nuestras Habitaciones</Text>
                    
                    {/* Habitación 1 */}
                    <View className="w-full bg-white dark:bg-dark-surface rounded-xl overflow-hidden mb-6 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80' }} className="w-full h-48" />
                        <View className="p-4">
                            <Text className="font-bold text-blue-950 dark:text-gold text-lg mb-1 font-sans">Suite Vista al Mar</Text>
                            <Text className="text-gray-500 dark:text-gray-400 text-sm mb-3 font-sans">Cama King size, balcón privado, jacuzzi y vistas panorámicas del océano.</Text>
                            <Text className="text-blue-950 dark:text-gold font-bold font-sans">Desde $299/noche</Text>
                        </View>
                    </View>

                    {/* Habitación 2 */}
                    <View className="w-full bg-white dark:bg-dark-surface rounded-xl overflow-hidden mb-6 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80' }} className="w-full h-48" />
                        <View className="p-4">
                            <Text className="font-bold text-blue-950 dark:text-gold text-lg mb-1 font-sans">Habitación Deluxe</Text>
                            <Text className="text-gray-500 dark:text-gray-400 text-sm mb-3 font-sans">Amplia y elegante, con 2 camas dobles y acceso directo a la piscina.</Text>
                            <Text className="text-blue-950 dark:text-gold font-bold font-sans">Desde $199/noche</Text>
                        </View>
                    </View>

                    {/* Habitación 3 */}
                    <View className="w-full bg-white dark:bg-dark-surface rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt">
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80' }} className="w-full h-48" />
                        <View className="p-4">
                            <Text className="font-bold text-blue-950 dark:text-gold text-lg mb-1 font-sans">Villa Premium</Text>
                            <Text className="text-gray-500 dark:text-gray-400 text-sm mb-3 font-sans">Privacidad total con piscina privada, servicio de mayordomo y terraza.</Text>
                            <Text className="text-blue-950 dark:text-gold font-bold font-sans">Desde $499/noche</Text>
                        </View>
                    </View>

                    <TouchableOpacity className="flex-row items-center bg-gold-dark px-6 py-3 rounded-full shadow-md">
                        <Text className="text-gray-800 dark:text-white text-base font-medium mr-2 font-sans">Ver todas las habitaciones</Text>
                        <Ionicons name="arrow-forward" size={18} color="#ffffff" />
                    </TouchableOpacity>
                </View>

                {/* OFERTAS ESPECIALES */}
                <View className="py-10 px-4 items-center">
                    <Text className="text-2xl font-serif text-blue-950 dark:text-gold mb-8 text-center">Ofertas Especiales</Text>
                    
                    <View className="w-full">
                        <View className="bg-white dark:bg-dark-surface rounded-xl p-6 mb-4 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt items-center w-full">
                            <Ionicons name="heart-outline" size={28} color="#d4af37" className="mb-3" />
                            <Text className="font-bold text-blue-950 dark:text-gold text-lg mb-2 text-center font-sans">Escapada Romántica</Text>
                            <Text className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3 font-sans">Incluye cena a la luz de las velas, botella de champagne y decoración especial</Text>
                            <Text className="text-blue-950 dark:text-gold font-bold font-sans">Desde $399/noche</Text>
                        </View>
                        <View className="bg-white dark:bg-dark-surface rounded-xl p-6 mb-4 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt items-center w-full">
                            <Ionicons name="people-outline" size={28} color="#d4af37" className="mb-3" />
                            <Text className="font-bold text-blue-950 dark:text-gold text-lg mb-2 text-center font-sans">Paquete Familiar</Text>
                            <Text className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3 font-sans">Habitación conectada para niños, actividades recreativas y desayuno incluido</Text>
                            <Text className="text-blue-950 dark:text-gold font-bold font-sans">Desde $499/noche</Text>
                        </View>
                        <View className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt items-center w-full">
                            <Ionicons name="calendar-outline" size={28} color="#d4af37" className="mb-3" />
                            <Text className="font-bold text-blue-950 dark:text-gold text-lg mb-2 text-center font-sans">Estancia Prolongada</Text>
                            <Text className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3 font-sans">Descuentos especiales para reservas de 5 noches o más</Text>
                            <Text className="text-blue-950 dark:text-gold font-bold font-sans">15% de descuento</Text>
                        </View>
                    </View>
                </View>

                {/* GALERÍA CAROUSEL */}
                <View className="py-10 bg-gray-50 dark:bg-dark-bg items-center relative">
                    <Text className="text-2xl font-serif text-blue-950 dark:text-gold mb-8 text-center">Galería</Text>
                    
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
                            className="absolute left-2 top-1/2 -translate-y-6 bg-white dark:bg-dark-surface/80 rounded-full p-2 shadow-sm"
                        >
                            <Ionicons name="chevron-back" size={24} color="#d4af37" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            onPress={() => scrollGallery('right')}
                            className="absolute right-2 top-1/2 -translate-y-6 bg-white dark:bg-dark-surface/80 rounded-full p-2 shadow-sm"
                        >
                            <Ionicons name="chevron-forward" size={24} color="#d4af37" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* EXPERIENCIAS (TESTIMONIALS) */}
                <View className="py-10 px-4 items-center">
                    <Text className="text-2xl font-serif text-blue-950 dark:text-gold mb-2 text-center">Experiencias Crystal Cove</Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-center mb-8 font-sans">Lo que dicen nuestros huéspedes</Text>
                    
                    <View className="w-full">
                        <View className="bg-white dark:bg-dark-surface rounded-xl p-6 mb-4 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt items-center w-full">
                            <View className="w-16 h-16 rounded-full bg-gray-100 dark:bg-dark-surfaceAlt mb-4 justify-center items-center overflow-hidden">
                                <Image source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' }} className="w-full h-full" />
                            </View>
                            <Text className="text-center text-sm text-gray-500 dark:text-gray-400 italic mb-4 font-sans">&quot;Una experiencia inolvidable. El servicio y las instalaciones superaron todas mis expectativas.&quot;</Text>
                            <Text className="font-bold text-blue-950 dark:text-gold text-sm font-sans">María González</Text>
                            <Text className="text-xs text-gray-500 dark:text-gray-400 font-sans">Huésped Frecuente</Text>
                        </View>
                        <View className="bg-white dark:bg-dark-surface rounded-xl p-6 mb-4 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt items-center w-full">
                            <View className="w-16 h-16 rounded-full bg-gray-100 dark:bg-dark-surfaceAlt mb-4 justify-center items-center overflow-hidden">
                                <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' }} className="w-full h-full" />
                            </View>
                            <Text className="text-center text-sm text-gray-500 dark:text-gray-400 italic mb-4 font-sans">&quot;El mejor hotel para combinar trabajo y descanso. El ambiente es perfecto para la concentración.&quot;</Text>
                            <Text className="font-bold text-blue-950 dark:text-gold text-sm font-sans">Carlos Ruiz</Text>
                            <Text className="text-xs text-gray-500 dark:text-gray-400 font-sans">Viajero de Negocios</Text>
                        </View>
                        <View className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt items-center w-full">
                            <View className="w-16 h-16 rounded-full bg-gray-100 dark:bg-dark-surfaceAlt mb-4 justify-center items-center overflow-hidden">
                                <Image source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' }} className="w-full h-full" />
                            </View>
                            <Text className="text-center text-sm text-gray-500 dark:text-gray-400 italic mb-4 font-sans">&quot;Nuestra estancia fue mágica. Cada detalle estaba cuidadosamente pensado para hacer nuestra experiencia especial.&quot;</Text>
                            <Text className="font-bold text-blue-950 dark:text-gold text-sm font-sans">Ana Martínez</Text>
                            <Text className="text-xs text-gray-500 dark:text-gray-400 font-sans">Luna de Miel</Text>
                        </View>
                    </View>
                </View>

                {/* CONTACTO */}
                <View className="py-10 bg-gray-50 dark:bg-dark-bg items-center px-4">
                    <Text className="text-2xl font-serif text-blue-950 dark:text-gold mb-8 text-center">Contacto</Text>
                    
                    <View className="w-full bg-white dark:bg-dark-surface rounded-xl p-6 mb-4 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt items-center">
                        <Ionicons name="location-outline" size={24} color="#d4af37" className="mb-2" />
                        <Text className="font-bold text-blue-950 dark:text-gold mb-1 font-sans">Ubicación</Text>
                        <Text className="text-center text-xs text-gray-500 dark:text-gray-400 font-sans">Blvd. Kukulcan Km 10,{`\n`}Zona Hotelera, Cancún, Q.R.</Text>
                    </View>
                    
                    <View className="w-full bg-white dark:bg-dark-surface rounded-xl p-6 mb-4 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt items-center">
                        <Ionicons name="call-outline" size={24} color="#d4af37" className="mb-2" />
                        <Text className="font-bold text-blue-950 dark:text-gold mb-1 font-sans">Teléfono</Text>
                        <Text className="text-center text-xs text-gray-500 dark:text-gray-400 font-sans">+52 55 4904 0246{`\n`}+1 234 567 890</Text>
                    </View>
                    
                    <View className="w-full bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt items-center">
                        <Ionicons name="mail-outline" size={24} color="#d4af37" className="mb-2" />
                        <Text className="font-bold text-blue-950 dark:text-gold mb-1 font-sans">Email</Text>
                        <Text className="text-center text-xs text-gray-500 dark:text-gray-400 font-sans">info@crystalcove.com{`\n`}reservas@crystalcove.com</Text>
                    </View>
                </View>

                {/* FOOTER */}
                <Footer />

            </ScrollView>
        </View>
    );
}