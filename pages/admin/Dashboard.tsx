import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, G } from 'react-native-svg';

export default function Dashboard() {
  const navigation = useNavigation<any>();
  const [perfiles, setPerfiles] = useState<any[]>([]);
  const [reservaciones, setReservaciones] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Nuevos estados para filtros
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState<'en_estancia' | 'confirmadas' | 'pasadas' | 'canceladas'>('en_estancia');

  const fetchData = async () => {
    setRefreshing(true);
    try {
        const [perfilesRes, reservasRes] = await Promise.all([
            supabase.from('perfiles').select('*').order('fecha_registro', { ascending: false }),
            supabase.from('reservaciones').select('*').order('fecha_creacion', { ascending: false })
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
          <SafeAreaView className="flex-1 bg-gray-50 dark:bg-dark-bg justify-center items-center">
              <ActivityIndicator size="large" color="#d4af37" />
              <Text className="mt-4 text-blue-950 dark:text-gold font-bold font-sans">Cargando Dashboard...</Text>
          </SafeAreaView>
      );
  }

  // Lógica de filtrado de reservaciones
  const today = new Date().toISOString().split('T')[0];
  
  // Categorías
  const enEstancia = reservaciones.filter(r => r.estado === 'en_estancia' && r.fecha_salida >= today);
  const confirmadas = reservaciones.filter(r => r.estado === 'confirmada' && r.fecha_salida >= today);
  const canceladas = reservaciones.filter(r => r.estado === 'cancelada');
  const pasadas = reservaciones.filter(r => r.fecha_salida < today && r.estado !== 'cancelada');

  // Cálculos de estadísticas superiores
  const totalUsuarios = perfiles.length;
  const huespedesEnEstancia = enEstancia.length;
  const totalConfirmadas = confirmadas.length;
  
  const reservacionesValidas = [...enEstancia, ...confirmadas, ...pasadas];
  const ingresoPromedio = reservacionesValidas.length > 0 
      ? reservacionesValidas.reduce((acc, curr) => acc + (Number(curr.precio_total) || 0), 0) / reservacionesValidas.length 
      : 0;

  // Datos para la gráfica de distribución
  const totalGraph = reservaciones.length || 1; // Para evitar división por cero
  const pEnEstancia = (enEstancia.length / totalGraph) * 100;
  const pConfirmadas = (confirmadas.length / totalGraph) * 100;
  const pPasadas = (pasadas.length / totalGraph) * 100;
  const pCanceladas = (canceladas.length / totalGraph) * 100;

  // Cálculos para el Donut Chart SVG
  const radius = 50;
  const strokeWidth = 20;
  const center = radius + strokeWidth;
  const size = center * 2;
  const circumference = 2 * Math.PI * radius;

  const dash1 = (pEnEstancia / 100) * circumference;
  const dash2 = (pConfirmadas / 100) * circumference;
  const dash3 = (pPasadas / 100) * circumference;
  const dash4 = (pCanceladas / 100) * circumference;

  // Determinar lista actual según pestaña
  let currentList = [];
  if (activeTab === 'en_estancia') currentList = enEstancia;
  else if (activeTab === 'confirmadas') currentList = confirmadas;
  else if (activeTab === 'pasadas') currentList = pasadas;
  else if (activeTab === 'canceladas') currentList = canceladas;

  // Filtrar por texto
  if (searchText.trim() !== '') {
      const lowerSearch = searchText.toLowerCase();
      currentList = currentList.filter(reserva => {
          const user = perfiles.find(p => p.id === reserva.id_usuario);
          const userName = user?.nombre_completo?.toLowerCase() || '';
          const userPhone = user?.telefono || '';
          const resId = reserva.id.toLowerCase();
          return userName.includes(lowerSearch) || userPhone.includes(lowerSearch) || resId.includes(lowerSearch);
      });
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-dark-bg" edges={['top']}>
      <View className="bg-white dark:bg-dark-surface py-4 px-6 shadow-sm z-10 border-b border-gray-200 dark:border-dark-surfaceAlt">
        <Text className="text-2xl font-serif font-bold text-blue-950 dark:text-gold">Panel de Control</Text>
        <Text className="text-gray-500 dark:text-gray-400 text-sm font-sans">Estadísticas en tiempo real</Text>
      </View>

      <ScrollView 
        className="flex-1 px-4 pt-6"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
      >
        <View className="flex-row flex-wrap justify-between mb-4">
          <View className="w-[48%] bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-sm mb-4 border border-gray-200 dark:border-dark-surfaceAlt items-center">
            <View className="bg-gray-100 dark:bg-dark-surfaceAlt w-12 h-12 rounded-full items-center justify-center mb-3">
                <Ionicons name="people" size={24} color="#1d4ed8" />
            </View>
            <Text className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase text-center mb-1 font-sans">Total Usuarios</Text>
            <Text className="text-2xl font-bold text-blue-950 dark:text-gold font-sans">{totalUsuarios}</Text>
          </View>

          <View className="w-[48%] bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-sm mb-4 border border-gray-200 dark:border-dark-surfaceAlt items-center">
            <View className="bg-green-50 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Ionicons name="bed" size={24} color="#15803d" />
            </View>
            <Text className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase text-center mb-1 font-sans">En Estancia</Text>
            <Text className="text-2xl font-bold text-green-700 font-sans">{huespedesEnEstancia}</Text>
          </View>

          <View className="w-[48%] bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-sm mb-4 border border-gray-200 dark:border-dark-surfaceAlt items-center">
            <View className="bg-yellow-50 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Ionicons name="calendar-outline" size={24} color="#a16207" />
            </View>
            <Text className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase text-center mb-1 font-sans">Confirmadas</Text>
            <Text className="text-2xl font-bold text-yellow-700 font-sans">{totalConfirmadas}</Text>
          </View>

          <View className="w-[48%] bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-sm mb-4 border border-gray-200 dark:border-dark-surfaceAlt items-center">
            <View className="bg-purple-50 w-12 h-12 rounded-full items-center justify-center mb-3">
                <Ionicons name="cash-outline" size={24} color="#7e22ce" />
            </View>
            <Text className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase text-center mb-1 font-sans">Ticket Promedio</Text>
            <Text className="text-xl font-bold text-purple-700 font-sans">${ingresoPromedio.toFixed(2)}</Text>
          </View>
        </View>

        {/* Gráfica Circular (Donut) */}
        <View className="bg-white dark:bg-dark-surface rounded-3xl p-6 shadow-sm mb-6 border border-gray-200 dark:border-dark-surfaceAlt flex-row items-center">
            <View className="mr-6 items-center justify-center">
                <Svg width={size} height={size}>
                    <G rotation="-90" origin={`${center}, ${center}`}>
                        {/* Fondo del círculo por si no hay reservas */}
                        <Circle cx={center} cy={center} r={radius} stroke="#f3f4f6" strokeWidth={strokeWidth} fill="transparent" />
                        
                        {pEnEstancia > 0 && (
                            <Circle
                                cx={center} cy={center} r={radius}
                                stroke="#22c55e" strokeWidth={strokeWidth} fill="transparent"
                                strokeDasharray={`${circumference} ${circumference}`}
                                strokeDashoffset={circumference - dash1}
                                strokeLinecap="butt"
                            />
                        )}
                        {pConfirmadas > 0 && (
                            <Circle
                                cx={center} cy={center} r={radius}
                                stroke="#eab308" strokeWidth={strokeWidth} fill="transparent"
                                strokeDasharray={`${circumference} ${circumference}`}
                                strokeDashoffset={circumference - dash2}
                                strokeLinecap="butt"
                                origin={`${center}, ${center}`}
                                rotation={(pEnEstancia / 100) * 360}
                            />
                        )}
                        {pPasadas > 0 && (
                            <Circle
                                cx={center} cy={center} r={radius}
                                stroke="#60a5fa" strokeWidth={strokeWidth} fill="transparent"
                                strokeDasharray={`${circumference} ${circumference}`}
                                strokeDashoffset={circumference - dash3}
                                strokeLinecap="butt"
                                origin={`${center}, ${center}`}
                                rotation={((pEnEstancia + pConfirmadas) / 100) * 360}
                            />
                        )}
                        {pCanceladas > 0 && (
                            <Circle
                                cx={center} cy={center} r={radius}
                                stroke="#f87171" strokeWidth={strokeWidth} fill="transparent"
                                strokeDasharray={`${circumference} ${circumference}`}
                                strokeDashoffset={circumference - dash4}
                                strokeLinecap="butt"
                                origin={`${center}, ${center}`}
                                rotation={((pEnEstancia + pConfirmadas + pPasadas) / 100) * 360}
                            />
                        )}
                    </G>
                </Svg>
                <View className="absolute items-center justify-center" style={{ width: size, height: size }}>
                    <Text className="text-xl font-bold text-blue-950 dark:text-gold font-sans">{reservaciones.length}</Text>
                    <Text className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase font-sans">Total</Text>
                </View>
            </View>

            {/* Leyenda a la derecha */}
            <View className="flex-1 justify-center">
                <Text className="text-sm font-bold text-gray-800 dark:text-white mb-3 font-sans">Distribución Total</Text>
                <View className="mb-2 flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                        <Text className="text-xs text-gray-600 font-medium font-sans">Estancia</Text>
                    </View>
                    <Text className="text-xs font-bold text-gray-800 dark:text-white font-sans">{pEnEstancia.toFixed(0)}%</Text>
                </View>
                <View className="mb-2 flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                        <Text className="text-xs text-gray-600 font-medium font-sans">Confirmadas</Text>
                    </View>
                    <Text className="text-xs font-bold text-gray-800 dark:text-white font-sans">{pConfirmadas.toFixed(0)}%</Text>
                </View>
                <View className="mb-2 flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View className="w-3 h-3 rounded-full bg-blue-400 mr-2" />
                        <Text className="text-xs text-gray-600 font-medium font-sans">Pasadas</Text>
                    </View>
                    <Text className="text-xs font-bold text-gray-800 dark:text-white font-sans">{pPasadas.toFixed(0)}%</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View className="w-3 h-3 rounded-full bg-red-400 mr-2" />
                        <Text className="text-xs text-gray-600 font-medium font-sans">Canceladas</Text>
                    </View>
                    <Text className="text-xs font-bold text-gray-800 dark:text-white font-sans">{pCanceladas.toFixed(0)}%</Text>
                </View>
            </View>
        </View>

        {/* Pestañas horizontales */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <TouchableOpacity 
                className={`px-4 py-2 rounded-full mr-2 ${activeTab === 'en_estancia' ? 'bg-gold-dark' : 'bg-gray-200'}`}
                onPress={() => setActiveTab('en_estancia')}
            >
                <Text className={`font-bold ${activeTab === 'en_estancia' ? 'text-gray-800 dark:text-white' : 'text-gray-600'}`}>En Estancia</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                className={`px-4 py-2 rounded-full mr-2 ${activeTab === 'confirmadas' ? 'bg-gold-dark' : 'bg-gray-200'}`}
                onPress={() => setActiveTab('confirmadas')}
            >
                <Text className={`font-bold ${activeTab === 'confirmadas' ? 'text-gray-800 dark:text-white' : 'text-gray-600'}`}>Confirmadas</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                className={`px-4 py-2 rounded-full mr-2 ${activeTab === 'pasadas' ? 'bg-gold-dark' : 'bg-gray-200'}`}
                onPress={() => setActiveTab('pasadas')}
            >
                <Text className={`font-bold ${activeTab === 'pasadas' ? 'text-gray-800 dark:text-white' : 'text-gray-600'}`}>Pasadas</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                className={`px-4 py-2 rounded-full mr-2 ${activeTab === 'canceladas' ? 'bg-gold-dark' : 'bg-gray-200'}`}
                onPress={() => setActiveTab('canceladas')}
            >
                <Text className={`font-bold ${activeTab === 'canceladas' ? 'text-gray-800 dark:text-white' : 'text-gray-600'}`}>Canceladas</Text>
            </TouchableOpacity>
        </ScrollView>

        {/* Buscador */}
        <View className="flex-row items-center bg-white dark:bg-dark-surface rounded-xl px-4 py-3 shadow-sm border border-gray-200 dark:border-dark-surfaceAlt mb-6">
            <Ionicons name="search" size={20} color="#9ca3af" className="mr-2" />
            <TextInput 
                className="flex-1 text-base text-gray-800 dark:text-white"
                placeholder="Buscar por nombre, teléfono o ID..."
                value={searchText}
                onChangeText={setSearchText}
            />
            {searchText !== '' && (
                <TouchableOpacity onPress={() => setSearchText('')}>
                    <Ionicons name="close-circle" size={20} color="#cbd5e1" />
                </TouchableOpacity>
            )}
        </View>
        
        {/* Lista de Reservaciones Filtradas */}
        <View className="bg-white dark:bg-dark-surface rounded-3xl shadow-sm border border-gray-200 dark:border-dark-surfaceAlt overflow-hidden mb-10">
            {currentList.length === 0 ? (
                <View className="p-8 items-center">
                    <Ionicons name="folder-open-outline" size={48} color="#cbd5e1" className="mb-2" />
                    <Text className="text-gray-500 dark:text-gray-400 text-center font-sans">No hay reservaciones en esta categoría.</Text>
                </View>
            ) : (
                currentList.map((reserva, index) => {
                    const user = perfiles.find(p => p.id === reserva.id_usuario);
                    
                    return (
                        <TouchableOpacity 
                            key={reserva.id}
                            className={`flex-row items-center p-4 ${index !== currentList.length - 1 ? 'border-b border-gray-50' : ''}`}
                            onPress={() => navigation.navigate('AdminUserDetails', { userId: reserva.id_usuario })}
                        >
                            <View className="w-12 h-12 bg-gray-100 dark:bg-dark-surfaceAlt rounded-full items-center justify-center mr-4">
                                <Text className="text-blue-800 font-bold text-lg font-sans">
                                    {user?.nombre_completo ? user.nombre_completo.charAt(0).toUpperCase() : 'U'}
                                </Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-base font-bold text-gray-800 dark:text-white font-sans" numberOfLines={1}>
                                    {user?.nombre_completo || 'Sin nombre'}
                                </Text>
                                <Text className="text-xs text-gray-500 dark:text-gray-400 font-sans">
                                    {reserva.fecha_entrada} a {reserva.fecha_salida}
                                </Text>
                            </View>
                            <View className="items-end justify-center">
                                <Text className="text-xs font-bold text-blue-950 dark:text-gold mb-1 font-sans">${reserva.precio_total}</Text>
                                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                            </View>
                        </TouchableOpacity>
                    );
                })
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
