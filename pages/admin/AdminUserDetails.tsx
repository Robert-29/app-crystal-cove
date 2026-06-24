import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import TicketCard from '../../components/TicketCard';

export default function AdminUserDetails() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { userId } = route.params || {};

    const [perfil, setPerfil] = useState<any>(null);
    const [reservas, setReservas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            // Obtener datos del perfil
            const { data: perfilData, error: perfilError } = await supabase
                .from('perfiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (perfilError) throw perfilError;
            setPerfil(perfilData);

            // Obtener todas sus reservaciones
            const { data: reservasData, error: reservasError } = await supabase
                .from('reservaciones')
                .select('*, habitaciones(numero_habitacion)')
                .eq('id_usuario', userId)
                .order('fecha_creacion', { ascending: false });

            if (reservasError) throw reservasError;
            setReservas(reservasData || []);
        } catch (error: any) {
            console.error('Error fetching user details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
                <ActivityIndicator size="large" color="#172554" />
                <Text className="mt-4 text-blue-950 font-bold">Cargando detalles...</Text>
            </SafeAreaView>
        );
    }

    if (!perfil) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center px-4">
                <Text className="text-xl font-bold text-gray-700 text-center">Usuario no encontrado</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4 bg-blue-950 px-6 py-3 rounded-xl">
                    <Text className="text-white font-bold">Volver</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
            <View className="flex-row items-center bg-white py-4 px-6 shadow-sm z-10 border-b border-gray-200">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color="#172554" />
                </TouchableOpacity>
                <View>
                    <Text className="text-xl font-serif font-bold text-blue-950">{perfil.nombre_completo}</Text>
                    <Text className="text-gray-500 text-xs">{perfil.telefono || 'Sin teléfono registrado'}</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 pt-6 pb-20" showsVerticalScrollIndicator={false}>
                <Text className="text-lg font-bold text-gray-800 mb-4">
                    Historial de Reservaciones ({reservas.length})
                </Text>

                {reservas.length === 0 ? (
                    <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 items-center mt-4">
                        <Ionicons name="document-text-outline" size={48} color="#9ca3af" className="mb-2" />
                        <Text className="text-gray-500 text-center">Este usuario no tiene reservaciones.</Text>
                    </View>
                ) : (
                    reservas.map(reserva => (
                        <TicketCard 
                            key={reserva.id}
                            reserva={reserva}
                            fullName={perfil.nombre_completo}
                            phone={perfil.telefono || 'No registrado'}
                            isAdmin={true}
                        />
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
