import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { supabase } from '../../lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScannerQR() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reservaInfo, setReservaInfo] = useState<any>(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setLoading(true);
    
    try {
      // Intentar buscar la reservación por código QR
      const { data: reserva, error } = await supabase
        .from('reservaciones')
        .select(`
          *,
          perfiles (nombre_completo, telefono)
        `)
        .eq('codigo_qr', data)
        .single();
      
      if (error || !reserva) {
        Alert.alert('No encontrado', 'No se encontró ninguna reservación con este código QR.');
      } else {
        setReservaInfo(reserva);
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const actualizarEstado = async (nuevoEstado: string) => {
    if (!reservaInfo) return;
    setLoading(true);
    try {
        const { error } = await supabase
            .from('reservaciones')
            .update({ estado: nuevoEstado })
            .eq('id', reservaInfo.id);
        
        if (error) throw error;
        
        Alert.alert('Éxito', `La reservación ha sido marcada como: ${nuevoEstado}`);
        setReservaInfo(null);
        setScanned(false);
    } catch (err: any) {
        Alert.alert('Error al actualizar', err.message);
    } finally {
        setLoading(false);
    }
  };

  if (hasPermission === null) {
    return <View className="flex-1 items-center justify-center bg-white"><ActivityIndicator size="large" /></View>;
  }
  if (hasPermission === false) {
    return <View className="flex-1 items-center justify-center bg-white"><Text>Sin acceso a la cámara</Text></View>;
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1">
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
        <View className="absolute bottom-10 left-0 right-0 items-center px-4">
            <View className="bg-white p-6 rounded-3xl w-full shadow-2xl border border-gray-100">
                {loading ? (
                    <View className="items-center py-4">
                        <ActivityIndicator size="large" color="#172554" />
                        <Text className="mt-4 text-blue-950 font-bold text-lg">Procesando...</Text>
                    </View>
                ) : reservaInfo ? (
                    <View>
                        <Text className="text-xl font-serif text-blue-950 font-bold mb-4 text-center">Detalles de Reserva</Text>
                        
                        <View className="bg-gray-50 p-4 rounded-xl mb-4">
                            <Text className="text-sm text-gray-500 mb-1">Nombre: <Text className="font-bold text-gray-800">{reservaInfo.perfiles?.nombre_completo || 'Huésped'}</Text></Text>
                            <Text className="text-sm text-gray-500 mb-1">Teléfono: <Text className="font-bold text-gray-800">{reservaInfo.perfiles?.telefono || 'No registrado'}</Text></Text>
                            <Text className="text-sm text-gray-500 mb-1">ID Reserva: <Text className="font-bold text-gray-800">{reservaInfo.id.substring(0, 8)}...</Text></Text>
                            <Text className="text-sm text-gray-500 mb-1">Check-In: <Text className="font-bold text-gray-800">{reservaInfo.fecha_entrada}</Text></Text>
                            <Text className="text-sm text-gray-500 mb-1">Check-Out: <Text className="font-bold text-gray-800">{reservaInfo.fecha_salida}</Text></Text>
                            <Text className="text-sm text-gray-500">Estado Actual: <Text className="font-bold text-blue-600 uppercase">{reservaInfo.estado}</Text></Text>
                        </View>

                        <TouchableOpacity 
                            className="bg-green-600 py-4 rounded-xl mb-3 shadow-sm"
                            onPress={() => actualizarEstado('en_estancia')}
                        >
                            <Text className="text-white text-center font-bold">Marcar "En Estancia"</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className="bg-red-500 py-4 rounded-xl mb-3 shadow-sm"
                            onPress={() => actualizarEstado('cancelada')}
                        >
                            <Text className="text-white text-center font-bold">Cancelar Reserva</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className="bg-gray-200 py-4 rounded-xl"
                            onPress={() => {
                                setReservaInfo(null);
                                setScanned(false);
                            }}
                        >
                            <Text className="text-gray-700 text-center font-bold">Escanear Otro Código</Text>
                        </TouchableOpacity>
                    </View>
                ) : scanned ? (
                    <View>
                        <Text className="text-center text-gray-800 mb-4 font-bold text-lg">Código no válido</Text>
                        <TouchableOpacity 
                            className="bg-blue-950 py-4 rounded-xl shadow-sm"
                            onPress={() => setScanned(false)}
                        >
                            <Text className="text-white text-center font-bold">Intentar de nuevo</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View className="py-4">
                        <Text className="text-center text-lg font-bold text-blue-950 mb-2">
                            Apunta la cámara a un código QR
                        </Text>
                        <Text className="text-center text-sm text-gray-500">
                            El escaneo es automático
                        </Text>
                    </View>
                )}
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
