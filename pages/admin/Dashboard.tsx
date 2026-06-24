import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    setRefreshing(true);
    const { data, error } = await supabase.rpc('get_hotel_stats');
    if (error) {
      console.error('Error fetching stats:', error);
    } else {
      setStats(data);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScrollView 
        className="flex-1 px-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchStats} />}
      >
        <Text className="text-3xl font-bold text-blue-950 mt-6 mb-8 text-center">
          Panel de Control
        </Text>

        <View className="flex-row flex-wrap justify-between">
          
          <View className="w-[48%] bg-white rounded-xl p-4 shadow-sm mb-4 border border-gray-100 items-center">
            <Ionicons name="people" size={32} color="#2563eb" className="mb-2" />
            <Text className="text-sm text-gray-500 font-semibold text-center">Huéspedes Actuales</Text>
            <Text className="text-3xl font-bold text-blue-950 mt-1">
              {stats?.huespedes_actuales || 0}
            </Text>
          </View>

          <View className="w-[48%] bg-white rounded-xl p-4 shadow-sm mb-4 border border-gray-100 items-center">
            <Ionicons name="calendar" size={32} color="#16a34a" className="mb-2" />
            <Text className="text-sm text-gray-500 font-semibold text-center">Reservaciones Activas</Text>
            <Text className="text-3xl font-bold text-blue-950 mt-1">
              {stats?.reservaciones_activas || 0}
            </Text>
          </View>

          <View className="w-[48%] bg-white rounded-xl p-4 shadow-sm mb-4 border border-gray-100 items-center">
            <Ionicons name="cash" size={32} color="#d97706" className="mb-2" />
            <Text className="text-sm text-gray-500 font-semibold text-center">Ingreso Promedio</Text>
            <Text className="text-xl font-bold text-blue-950 mt-2">
              ${stats?.ingreso_promedio || '0.00'}
            </Text>
          </View>

          <View className="w-[48%] bg-white rounded-xl p-4 shadow-sm mb-4 border border-gray-100 items-center">
            <Ionicons name="bed" size={32} color="#9333ea" className="mb-2" />
            <Text className="text-sm text-gray-500 font-semibold text-center">Habitaciones Disponibles</Text>
            <Text className="text-3xl font-bold text-blue-950 mt-1">
              {stats?.habitaciones_disponibles || 0}
            </Text>
          </View>

        </View>

        <Text className="text-center text-gray-500 mt-10">
          Desliza hacia abajo para actualizar
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
