import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation<any>();
  const [perfiles, setPerfiles] = useState<any[]>([]);
  const [reservaciones, setReservaciones] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setRefreshing(true);
    try {
        const [perfilesRes, reservasRes] = await Promise.all([
            supabase.from('perfiles').select('*').order('fecha_registro', { ascending: false }),
            supabase.from('reservaciones').select('*')
        ]);

        if (perfilesRes.error) throw perfilesRes.error;
        if (reservasRes.error) throw reservasRes.error;

        setPerfiles(perfilesRes.data || []);
        setReservaciones(reservasRes.data || []);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    } finally {
        setRefreshing(false);
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Suscripciones en tiempo real
    const reservasSub = supabase
        .channel('dashboard_reservas')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'reservaciones' }, () => {
            fetchData();
        })
        .subscribe();

    const perfilesSub = supabase
        .channel('dashboard_perfiles')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'perfiles' }, () => {
            fetchData();
        })
        .subscribe();

    return () => {
        supabase.removeChannel(reservasSub);
        supabase.removeChannel(perfilesSub);
    };
  }, []);

  if (loading) {
      return (
          <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
              <ActivityIndicator size="large" color="#172554" />
              <Text className="mt-4 text-blue-950 font-bold">Cargando Dashboard...</Text>
          </SafeAreaView>
      );
  }

  // Cálculos de estadísticas
  const totalUsuarios = perfiles.length;
  const huespedesEnEstancia = reservaciones.filter(r => r.estado === 'en_estancia').length;
  const confirmadas = reservaciones.filter(r => r.estado === 'confirmada').length;
  
  const reservacionesValidas = reservaciones.filter(r => r.estado === 'completada' || r.estado === 'en_estancia' || r.estado === 'confirmada');
  const ingresoPromedio = reservacionesValidas.length > 0 
      ? reservacionesValidas.reduce((acc, curr) => acc + (Number(curr.precio_total) || 0), 0) / reservacionesValidas.length 
      : 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <View className="bg-white py-4 px-6 shadow-sm z-10 border-b border-gray-200">
        <Text className="text-2xl font-serif font-bold text-blue-950">Panel de Control</Text>
        <Text className="text-gray-500 text-sm">Estadísticas en tiempo real</Text>
      </View>

      <ScrollView 
        className="flex-1 px-4 pt-6"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
      >
        <View className="flex-row flex-wrap justify-between mb-6">
          <View className="w-[48%] bg-white rounded-2xl p-5 shadow-sm mb-4 border border-gray-100 items-center">
            <View className="bg-blue-50 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Ionicons name="people" size={24} color="#1d4ed8" />
            </View>
            <Text className="text-xs text-gray-500 font-bold uppercase text-center mb-1">Total Usuarios</Text>
            <Text className="text-2xl font-bold text-blue-950">{totalUsuarios}</Text>
          </View>

          <View className="w-[48%] bg-white rounded-2xl p-5 shadow-sm mb-4 border border-gray-100 items-center">
            <View className="bg-green-50 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Ionicons name="bed" size={24} color="#15803d" />
            </View>
            <Text className="text-xs text-gray-500 font-bold uppercase text-center mb-1">En Estancia</Text>
            <Text className="text-2xl font-bold text-green-700">{huespedesEnEstancia}</Text>
          </View>

          <View className="w-[48%] bg-white rounded-2xl p-5 shadow-sm mb-4 border border-gray-100 items-center">
            <View className="bg-yellow-50 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Ionicons name="calendar-outline" size={24} color="#a16207" />
            </View>
            <Text className="text-xs text-gray-500 font-bold uppercase text-center mb-1">Confirmadas</Text>
            <Text className="text-2xl font-bold text-yellow-700">{confirmadas}</Text>
          </View>

          <View className="w-[48%] bg-white rounded-2xl p-5 shadow-sm mb-4 border border-gray-100 items-center">
            <View className="bg-purple-50 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Ionicons name="cash-outline" size={24} color="#7e22ce" />
            </View>
            <Text className="text-xs text-gray-500 font-bold uppercase text-center mb-1">Ticket Promedio</Text>
            <Text className="text-xl font-bold text-purple-700">${ingresoPromedio.toFixed(2)}</Text>
          </View>
        </View>

        <Text className="text-lg font-bold text-blue-950 mb-4 px-2">Directorio de Usuarios</Text>
        
        <View className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-10">
            {perfiles.map((user, index) => {
                const userReservas = reservaciones.filter(r => r.id_usuario === user.id);
                const hasActive = userReservas.some(r => r.estado === 'en_estancia' || r.estado === 'confirmada');

                return (
                    <TouchableOpacity 
                        key={user.id}
                        className={`flex-row items-center p-4 ${index !== perfiles.length - 1 ? 'border-b border-gray-50' : ''}`}
                        onPress={() => navigation.navigate('AdminUserDetails', { userId: user.id })}
                    >
                        <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
                            <Text className="text-blue-800 font-bold text-lg">
                                {user.nombre_completo ? user.nombre_completo.charAt(0).toUpperCase() : 'U'}
                            </Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-bold text-gray-800" numberOfLines={1}>
                                {user.nombre_completo || 'Sin nombre'}
                            </Text>
                            <Text className="text-xs text-gray-500">
                                {user.telefono || 'Sin teléfono'} • {userReservas.length} reservas
                            </Text>
                        </View>
                        <View className="items-end justify-center">
                            {hasActive && (
                                <View className="w-3 h-3 rounded-full bg-green-500 mb-2" />
                            )}
                            <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
