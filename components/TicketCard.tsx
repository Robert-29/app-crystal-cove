import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';

interface TicketCardProps {
    reserva: any;
    fullName: string;
    phone: string;
    isAdmin?: boolean;
}

export default function TicketCard({ reserva, fullName, phone, isAdmin = false }: TicketCardProps) {
    const viewShotRef = useRef<any>(null);

    const descargarTicket = async () => {
        try {
            if (!viewShotRef.current) {
                Alert.alert('Error', 'No se pudo generar el ticket.');
                return;
            }
            
            // Capturar la vista como URI
            const uri = await viewShotRef.current.capture();
            
            // Comprobar si se puede compartir
            const isAvailable = await Sharing.isAvailableAsync();
            if (isAvailable) {
                await Sharing.shareAsync(uri, {
                    dialogTitle: 'Ticket de Crystal Cove'
                });
            } else {
                Alert.alert('Aviso', 'La función de compartir no está disponible en este dispositivo.');
            }
        } catch (err: any) {
            console.error(err);
            Alert.alert('Error', 'No se pudo descargar el ticket.');
        }
    };

    return (
        <View className="mb-8">
            <ViewShot 
                ref={viewShotRef} 
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
                            <View className="flex-row mt-2 justify-between">
                                <Text className="text-sm text-gray-700 mr-4">Tel: {phone}</Text>
                            </View>
                        </View>
                        
                        <View className="flex-row justify-between items-end pb-2">
                            <View>
                                <Text className="text-xs text-gray-400 font-bold uppercase mb-1">Total Pagado</Text>
                                <Text className="text-xl text-green-600 font-bold">${reserva.precio_total}</Text>
                            </View>
                            <View className="items-end">
                                <View className="bg-blue-50 px-3 py-1 rounded-full mb-1">
                                    <Text className="text-blue-800 text-xs font-bold uppercase">{reserva.estado}</Text>
                                </View>
                                {isAdmin && reserva.habitaciones && (
                                    <View className="bg-yellow-100 px-3 py-1 rounded-full mt-1">
                                        <Text className="text-yellow-800 text-xs font-bold uppercase">Habitación: {reserva.habitaciones.numero_habitacion}</Text>
                                    </View>
                                )}
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
            </ViewShot>

            {/* Botón de descarga fuera del ViewShot */}
            {!isAdmin && (
                <TouchableOpacity 
                    className="flex-row justify-center items-center bg-blue-600 py-4 rounded-xl mt-4 shadow-md"
                    onPress={descargarTicket}
                >
                    <Ionicons name="download-outline" size={20} color="white" className="mr-2" />
                    <Text className="text-white font-bold text-base">Guardar Ticket</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
