import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native'; // Force rebuild
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import TicketCard from '../components/TicketCard';

export default function Reservas() {
    const { session, user, profile } = useAuth();
    const navigation = useNavigation<any>();
    const [reservas, setReservas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'confirmadas' | 'en_estancia' | 'pasadas' | 'canceladas'>('confirmadas');

    useEffect(() => {
        let subscription: any;

        if (session && user) {
            fetchReservas();

            // Suscribirse a cambios en tiempo real
            subscription = supabase
                .channel('mis_reservaciones')
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'reservaciones',
                        filter: `id_usuario=eq.${user.id}`
                    },
                    () => {
                        // Recargar reservaciones cuando haya un cambio (insert, update, delete)
                        fetchReservas();
                    }
                )
                .subscribe();

        } else {
            setLoading(false);
        }

        return () => {
            if (subscription) {
                supabase.removeChannel(subscription);
            }
        };
    }, [session, user]);

    const fetchReservas = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('reservaciones')
                .select('*, habitaciones(numero_habitacion)')
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
    
    // Filtrar reservaciones según la pestaña
    const today = new Date().toISOString().split('T')[0];
    const filteredReservas = reservas.filter(reserva => {
        const isPasada = reserva.fecha_salida < today;
        if (activeTab === 'canceladas') return reserva.estado === 'cancelada';
        if (activeTab === 'pasadas') return isPasada && reserva.estado !== 'cancelada';
        if (activeTab === 'en_estancia') return reserva.estado === 'en_estancia' && !isPasada;
        if (activeTab === 'confirmadas') return reserva.estado === 'confirmada' && !isPasada;
        return false;
    });

    return (
        <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
            {/* Header Mínimo */}
            <View className="bg-white py-4 px-6 shadow-sm z-10">
                <Text className="text-2xl font-serif font-bold text-blue-950">Mis Tickets</Text>
                <Text className="text-gray-500 text-sm">Presenta este código al llegar al hotel</Text>
            </View>

            {/* Pestañas (Tabs) */}
            <View className="flex-row bg-white border-b border-gray-200">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full">
                    <TouchableOpacity 
                        className={`px-4 py-3 border-b-2 ${activeTab === 'confirmadas' ? 'border-blue-950' : 'border-transparent'}`}
                        onPress={() => setActiveTab('confirmadas')}
                    >
                        <Text className={`font-bold ${activeTab === 'confirmadas' ? 'text-blue-950' : 'text-gray-400'}`}>Confirmadas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className={`px-4 py-3 border-b-2 ${activeTab === 'en_estancia' ? 'border-blue-950' : 'border-transparent'}`}
                        onPress={() => setActiveTab('en_estancia')}
                    >
                        <Text className={`font-bold ${activeTab === 'en_estancia' ? 'text-blue-950' : 'text-gray-400'}`}>En Estancia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className={`px-4 py-3 border-b-2 ${activeTab === 'pasadas' ? 'border-blue-950' : 'border-transparent'}`}
                        onPress={() => setActiveTab('pasadas')}
                    >
                        <Text className={`font-bold ${activeTab === 'pasadas' ? 'text-blue-950' : 'text-gray-400'}`}>Pasadas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className={`px-4 py-3 border-b-2 ${activeTab === 'canceladas' ? 'border-blue-950' : 'border-transparent'}`}
                        onPress={() => setActiveTab('canceladas')}
                    >
                        <Text className={`font-bold ${activeTab === 'canceladas' ? 'text-blue-950' : 'text-gray-400'}`}>Canceladas</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <ScrollView className="flex-1 px-4 pt-6 pb-20" showsVerticalScrollIndicator={false}>
                {filteredReservas.length === 0 ? (
                    <View className="items-center justify-center mt-10">
                        <Text className="text-gray-500 text-center">No hay reservaciones en esta sección.</Text>
                    </View>
                ) : (
                    filteredReservas.map((reserva) => {
                    const fullName = profile?.nombre_completo || 'Huésped';
                    const email = user?.email || 'Sin correo';
                    const phone = profile?.telefono || 'No registrado';

                    return (
                        <TicketCard 
                            key={reserva.id} 
                            reserva={reserva} 
                            fullName={fullName} 
                            phone={phone} 
                            isAdmin={false} 
                        />
                    );
                }))}
            </ScrollView>
        </SafeAreaView>
    );
}
