import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { supabase } from '../../lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScannerQR() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const { data: responseData, error } = await supabase.rpc('validate_qr_code', { p_codigo_qr: data });
      
      if (error) {
        Alert.alert('Error del Servidor', error.message);
      } else {
        if (responseData.success) {
          Alert.alert('Éxito', responseData.message);
        } else {
          Alert.alert('Aviso', responseData.message);
        }
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
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
            <View className="bg-white/90 p-4 rounded-xl w-full shadow-lg">
                {loading ? (
                    <View className="items-center py-4">
                        <ActivityIndicator size="large" color="#172554" />
                        <Text className="mt-2 text-gray-700 font-bold text-lg">Validando código...</Text>
                    </View>
                ) : scanned ? (
                    <Button title={'Toca para Escanear de Nuevo'} onPress={() => setScanned(false)} color="#172554" />
                ) : (
                    <Text className="text-center text-lg font-bold text-gray-800">
                        Apunta la cámara a un código QR
                    </Text>
                )}
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
