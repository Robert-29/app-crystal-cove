import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native';

export default function Reservas() {
    const { session, user, profile } = useAuth();
    const navigation = useNavigation<any>();
    const [reservas, setReservas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Referencias para cada ticket para poder capturarlos
    const viewShotRefs = useRef<{ [key: string]: any }>({});

    useEffect(() => {
        if (session && user) {
            fetchReservas();
        } else {
            setLoading(false);
        }
    }, [session, user]);

    const fetchReservas = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('reservaciones')
                .select('*')
                .eq('id_usuario', user?.id)
                .order('fecha_creacion', { ascending: false });

            if (error) throw error;
            setReservas(data || []);
        } catch (error: any) {
            console.error('Error fetching reservations:', error);
            Alert.alert('Error', 'No se pudieron cargar tus reservaciones.');
        } finally {
            setLoading(false);
        }
    };

    const descargarTicket = async (id: string) => {
        try {
            const ref = viewShotRefs.current[id];
            if (!ref) {
                Alert.alert('Error', 'No se pudo generar el ticket.');
                return;
            }
            
            // Capturar la vista como URI
            const uri = await ref.capture();
            
            // Comprobar si se puede compartir
            const isAvailable = await Sharing.isAvailableAsync();
            if (isAvailable) {
                await Sharing.shareAsync(uri, {
                    dialogTitle: 'Tu Ticket de Crystal Cove'
                });
            } else {
                Alert.alert('Aviso', 'La función de compartir no está disponible en este dispositivo.');
            }
        } catch (err: any) {
            console.error(err);
            Alert.alert('Error', 'No se pudo descargar el ticket.');
        }
    };

    // ESTADO: CARGANDO
    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
                <ActivityIndicator size="large" color="#172554" />
                <Text className="mt-4 text-blue-950 font-bold">Cargando reservaciones...</Text>
            </SafeAreaView>
        );
    }

    // ESTADO: NO LOGUEADO (Este caso en realidad ya no se dará por la redirección de BottomMenu, 
    // pero lo dejamos como protección adicional).
    if (!session) {
        return (
            <SafeAreaView className="flex-1 bg-white flex flex-col" edges={['top']}>
                <View className="flex-1 justify-center items-center px-6">
                    <View className="w-24 h-24 bg-blue-50 rounded-full justify-center items-center mb-6">
                        <Ionicons name="lock-closed-outline" size={48} color="#172554" />
                    </View>
                    <Text className="text-2xl font-serif text-blue-950 text-center mb-4">Mis Reservaciones</Text>
                    <Text className="text-center text-gray-500 mb-8 px-4">Inicia sesión para ver tus reservaciones.</Text>
                </View>
                <Footer />
            </SafeAreaView>
        );
    }

    // ESTADO: SIN RESERVACIONES
    if (reservas.length === 0) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
                <View className="flex-1 justify-center items-center px-6">
                    <Ionicons name="calendar-outline" size={64} color="#9ca3af" className="mb-4" />
                    <Text className="text-xl font-bold text-gray-700 mb-2 text-center">Aún no tienes reservaciones</Text>
                    <Text className="text-gray-500 text-center mb-8">Planea tu próxima escapada con nosotros.</Text>
                    
                    <TouchableOpacity 
                        className="bg-blue-950 px-8 py-4 rounded-xl shadow-md w-full"
                        onPress={() => navigation.navigate('Habitaciones')}
                    >
                        <Text className="text-white text-center font-bold text-base">Ver Habitaciones</Text>
                    </TouchableOpacity>
                </View>
                <Footer />
            </SafeAreaView>
        );
    }

    // ESTADO: CON RESERVACIONES
    return (
        <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
            {/* Header Mínimo */}
            <View className="bg-white py-4 px-6 shadow-sm z-10">
                <Text className="text-2xl font-serif font-bold text-blue-950">Mis Tickets</Text>
                <Text className="text-gray-500 text-sm">Presenta este código al llegar al hotel</Text>
            </View>

            <ScrollView className="flex-1 px-4 pt-6 pb-20" showsVerticalScrollIndicator={false}>
                {reservas.map((reserva) => {
                    const fullName = profile?.nombre_completo || 'Huésped';
                    const email = user?.email || 'Sin correo';
                    const phone = profile?.telefono || 'No registrado';

                    return (
                        <View key={reserva.id} className="mb-8">
                            {/* Componente ViewShot para capturar exactamente este bloque */}
                            <ViewShot 
                                ref={(el: any) => { viewShotRefs.current[reserva.id] = el; }} 
                                options={{ format: 'png', quality: 0.9 }}
                            >
                                <View className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                                    {/* Cabecera del ticket */}
                                    <View className="bg-blue-950 p-6 items-center">
                                        <Text className="text-white font-serif text-2xl font-bold tracking-widest">CRYSTAL COVE</Text>
                                        <Text className="text-blue-200 text-xs mt-1 uppercase tracking-widest">Boarding Pass</Text>
                                    </View>

                                    {/* Cuerpo del ticket (Datos) */}
                                    <View className="p-6">
                                        <View className="border-b border-gray-100 pb-4 mb-4">
                                            <Text className="text-xs text-gray-400 font-bold uppercase mb-1">A nombre de</Text>
                                            <Text className="text-lg text-blue-950 font-bold">{fullName}</Text>
                                        </View>

                                        <View className="flex-row justify-between border-b border-gray-100 pb-4 mb-4">
                                            <View className="flex-1">
                                                <Text className="text-xs text-gray-400 font-bold uppercase mb-1">Check-In</Text>
                                                <Text className="text-base text-gray-800 font-semibold">{reserva.fecha_entrada}</Text>
                                            </View>
                                            <View className="flex-1 items-end">
                                                <Text className="text-xs text-gray-400 font-bold uppercase mb-1">Check-Out</Text>
                                                <Text className="text-base text-gray-800 font-semibold">{reserva.fecha_salida}</Text>
                                            </View>
                                        </View>

                                        <View className="border-b border-gray-100 pb-4 mb-4">
                                            <Text className="text-xs text-gray-400 font-bold uppercase mb-1">Detalles de la Reserva</Text>
                                            <Text className="text-sm text-gray-700 leading-relaxed">{reserva.notas || 'Sin detalles extra'}</Text>
                                            <View className="flex-row mt-2">
                                                <Text className="text-sm text-gray-700 mr-4">Tel: {phone}</Text>
                                            </View>
                                        </View>
                                        
                                        <View className="flex-row justify-between items-end pb-2">
                                            <View>
                                                <Text className="text-xs text-gray-400 font-bold uppercase mb-1">Total Pagado</Text>
                                                <Text className="text-xl text-green-600 font-bold">${reserva.precio_total}</Text>
                                            </View>
                                            <View className="bg-blue-50 px-3 py-1 rounded-full">
                                                <Text className="text-blue-800 text-xs font-bold uppercase">{reserva.estado}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Separador dentado visual (Dashed line) */}
                                    <View className="flex-row items-center -my-3 z-10 relative">
                                        <View className="w-6 h-6 rounded-full bg-gray-100 -ml-3" />
                                        <View className="flex-1 h-[1px] border-b-2 border-dashed border-gray-200" />
                                        <View className="w-6 h-6 rounded-full bg-gray-100 -mr-3" />
                                    </View>

                                    {/* Footer del ticket con QR */}
                                    <View className="bg-gray-50 p-6 items-center">
                                        <View className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3">
                                            <QRCode
                                                value={reserva.codigo_qr || `QR-${reserva.id}`}
                                                size={150}
                                                color="black"
                                                backgroundColor="white"
                                            />
                                        </View>
                                        <Text className="text-xs text-gray-400 text-center uppercase tracking-widest mt-2">{reserva.codigo_qr || `QR-${reserva.id}`}</Text>
                                        <Text className="text-[10px] text-gray-400 text-center mt-2">Escanea este código al llegar a recepción</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Botón de descarga fuera del ViewShot */}
                            <TouchableOpacity 
                                className="flex-row justify-center items-center bg-blue-600 py-4 rounded-xl mt-4 shadow-md"
                                onPress={() => descargarTicket(reserva.id)}
                            >
                                <Ionicons name="download-outline" size={20} color="white" className="mr-2" />
                                <Text className="text-white font-bold text-base">Guardar Ticket</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}
