import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { ROOMS_DATA } from './Habitaciones';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useStripe } from '@stripe/stripe-react-native';

const { width } = Dimensions.get('window');

export default function RoomDetails() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    
    // Buscar la información de la habitación
    const { roomId } = route.params || {};
    const room = ROOMS_DATA.find(r => r.id === roomId) || ROOMS_DATA[0];

    // Auth context
    const { session, user } = useAuth();

    // Estados
    const [checkIn, setCheckIn] = useState<string>('');
    const [checkOut, setCheckOut] = useState<string>('');
    const [isSaving, setIsSaving] = useState(false);
    
    // Stripe
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const fetchPaymentSheetParams = async (amount: number, reservaId: string) => {
        const { data, error } = await supabase.functions.invoke('create-payment-intent', {
            body: { amount, reservaId }
        });
        if (error) throw new Error('Error al conectar con la pasarela de pagos.');
        return data;
    };
    
    // Servicios Extras
    const [extraDesayuno, setExtraDesayuno] = useState(false);
    const [extraSpa, setExtraSpa] = useState(false);
    const [extraTransporte, setExtraTransporte] = useState(false);

    // Lógica para el calendario
    const onDayPress = (day: any) => {
        if (!checkIn || (checkIn && checkOut)) {
            setCheckIn(day.dateString);
            setCheckOut('');
        } else if (checkIn && !checkOut) {
            // Validar que el check-out sea después del check-in
            if (day.dateString > checkIn) {
                setCheckOut(day.dateString);
            } else {
                setCheckIn(day.dateString);
                setCheckOut('');
            }
        }
    };

    // Marcas del calendario
    const getMarkedDates = () => {
        let marked: any = {};
        if (checkIn) {
            marked[checkIn] = { startingDay: true, color: '#172554', textColor: 'white' };
        }
        if (checkOut) {
            marked[checkOut] = { endingDay: true, color: '#172554', textColor: 'white' };
        }
        if (checkIn && checkOut) {
            // Idealmente aquí se calcularían los días intermedios, 
            // pero para esta maqueta solo marcamos inicio y fin
            // y agregamos un estado de seleccionado.
        }
        return marked;
    };

    // Cálculo básico de total
    const calcularTotal = () => {
        let total = room.price;
        if (checkIn && checkOut) {
            // Cálculo super básico asumiendo 1 noche por defecto si hay fechas (en una app real se calcularía la diferencia de días)
            const date1 = new Date(checkIn);
            const date2 = new Date(checkOut);
            const diffTime = Math.abs(date2.getTime() - date1.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            total = room.price * (diffDays || 1);
        }
        if (extraDesayuno) total += 35;
        if (extraSpa) total += 120;
        if (extraTransporte) total += 50;
        return total;
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-dark-bg" edges={['top']}>
            
            {/* Header con botón atrás */}
            <View className="flex-row items-center px-4 py-3 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-surfaceAlt">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3 p-2">
                    <Ionicons name="arrow-back" size={24} color="#d4af37" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-blue-950 dark:text-gold flex-1 font-sans" numberOfLines={1}>{room.title}</Text>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                
                {/* Carrusel de Imágenes */}
                <View>
                    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} className="w-full h-64">
                        {room.images.map((img: string, idx: number) => (
                            <Image key={idx} source={{ uri: img }} style={{ width, height: 256 }} />
                        ))}
                    </ScrollView>
                    <View className="absolute bottom-3 right-3 bg-black/50 px-3 py-1 rounded-full">
                        <Text className="text-gray-800 dark:text-white text-xs font-bold font-sans">1 / 3</Text>
                    </View>
                </View>

                {/* Detalles de la habitación */}
                <View className="px-4 py-6">
                    <View className="flex-row justify-between items-start mb-2">
                        <Text className="text-2xl font-serif text-blue-950 dark:text-gold flex-1 mr-4">{room.title}</Text>
                        <Text className="text-xl font-bold text-blue-950 dark:text-gold font-sans">${room.price} <Text className="text-sm font-normal text-gray-500 dark:text-gray-400 font-sans">/noche</Text></Text>
                    </View>
                    <Text className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-6 font-sans">{room.description}</Text>

                    {/* Qué incluye */}
                    <Text className="text-lg font-bold text-blue-950 dark:text-gold mb-4 font-sans">¿Qué incluye tu habitación?</Text>
                    <View className="bg-dark-bg p-4 rounded-xl border border-gray-200 dark:border-dark-surfaceAlt mb-8">
                        {room.amenities.map((amenity: string, idx: number) => (
                            <View key={idx} className="flex-row items-center mb-3">
                                <Ionicons name="checkmark-circle" size={20} color="#16a34a" className="mr-3" />
                                <Text className="text-gray-700 dark:text-gray-300 font-sans">{amenity}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Calendario */}
                    <Text className="text-lg font-bold text-blue-950 dark:text-gold mb-2 font-sans">Selecciona tus fechas</Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-sm mb-4 font-sans">Check-in / Check-out</Text>
                    
                    <View className="border border-gray-200 dark:border-dark-surfaceAlt rounded-xl overflow-hidden mb-8">
                        <Calendar
                            onDayPress={onDayPress}
                            markedDates={getMarkedDates()}
                            markingType={'period'}
                            theme={{
                                selectedDayBackgroundColor: '#172554',
                                todayTextColor: '#2563eb',
                                arrowColor: '#172554',
                            }}
                        />
                    </View>

                    {/* Servicios Extras */}
                    <Text className="text-lg font-bold text-blue-950 dark:text-gold mb-4 font-sans">Servicios Extras</Text>
                    <View className="mb-8">
                        <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-dark-surfaceAlt">
                            <View className="flex-1 mr-4">
                                <Text className="font-bold text-gray-800 dark:text-white font-sans">Desayuno Gourmet a la cama</Text>
                                <Text className="text-sm text-gray-500 dark:text-gray-400 font-sans">+$35 por estadía</Text>
                            </View>
                            <Switch value={extraDesayuno} onValueChange={setExtraDesayuno} trackColor={{ false: '#d1d5db', true: '#93c5fd' }} thumbColor={extraDesayuno ? '#1d4ed8' : '#f3f4f6'} />
                        </View>
                        <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-dark-surfaceAlt">
                            <View className="flex-1 mr-4">
                                <Text className="font-bold text-gray-800 dark:text-white font-sans">Masaje Relajante en Spa</Text>
                                <Text className="text-sm text-gray-500 dark:text-gray-400 font-sans">+$120 por persona</Text>
                            </View>
                            <Switch value={extraSpa} onValueChange={setExtraSpa} trackColor={{ false: '#d1d5db', true: '#93c5fd' }} thumbColor={extraSpa ? '#1d4ed8' : '#f3f4f6'} />
                        </View>
                        <View className="flex-row justify-between items-center mb-4">
                            <View className="flex-1 mr-4">
                                <Text className="font-bold text-gray-800 dark:text-white font-sans">Transporte VIP Aeropuerto</Text>
                                <Text className="text-sm text-gray-500 dark:text-gray-400 font-sans">+$50 viaje redondo</Text>
                            </View>
                            <Switch value={extraTransporte} onValueChange={setExtraTransporte} trackColor={{ false: '#d1d5db', true: '#93c5fd' }} thumbColor={extraTransporte ? '#1d4ed8' : '#f3f4f6'} />
                        </View>
                    </View>

                </View>

                {/* Resumen Final */}
                <View className="bg-gray-100 dark:bg-dark-surfaceAlt p-6 rounded-t-3xl mt-4">
                    <Text className="text-gray-800 dark:text-white text-lg font-bold mb-4 font-sans">Resumen de tu reserva</Text>
                    
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-700 dark:text-gray-300 font-sans">Habitación</Text>
                        <Text className="text-gray-800 dark:text-white font-bold font-sans">${room.price} / noche</Text>
                    </View>
                    
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-700 dark:text-gray-300 font-sans">Fechas seleccionadas</Text>
                        <Text className="text-gray-800 dark:text-white font-bold font-sans">{checkIn ? `${checkIn} al ${checkOut || '?'}` : 'Ninguna'}</Text>
                    </View>

                    <View className="flex-row justify-between mb-4 border-b border-gray-700 pb-4">
                        <Text className="text-gray-700 dark:text-gray-300 font-sans">Servicios Extra</Text>
                        <Text className="text-gray-800 dark:text-white font-bold font-sans">${(extraDesayuno ? 35 : 0) + (extraSpa ? 120 : 0) + (extraTransporte ? 50 : 0)}</Text>
                    </View>

                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-gray-800 dark:text-white text-xl font-bold font-sans">Total Estimado</Text>
                        <Text className="text-blue-950 dark:text-gold-light text-2xl font-bold font-sans">${calcularTotal()}</Text>
                    </View>

                    <TouchableOpacity 
                        className={`py-4 rounded-xl items-center ${isSaving ? 'bg-blue-400' : 'bg-gold'}`}
                        disabled={isSaving}
                        onPress={async () => {
                            if (!session || !user) {
                                Alert.alert("Inicia sesión", "Debes iniciar sesión para hacer una reservación.", [
                                    { text: "Cancelar", style: "cancel" },
                                    { text: "Ir a Login", onPress: () => navigation.navigate('Perfil') }
                                ]);
                                return;
                            }
                            if (!checkIn || !checkOut) {
                                Alert.alert("Faltan fechas", "Por favor selecciona una fecha de Check-in y Check-out.");
                                return;
                            }
                            
                            setIsSaving(true);
                            try {
                                // 1. Buscar una habitación real en la base de datos
                                const { data: dbRooms } = await supabase.from('habitaciones').select('id').limit(1);
                                const dbRoomId = dbRooms && dbRooms.length > 0 ? dbRooms[0].id : null;

                                if (!dbRoomId) {
                                    Alert.alert("Error", "No hay habitaciones configuradas en la base de datos.");
                                    setIsSaving(false);
                                    return;
                                }

                                // 2. Guardar reservación como pendiente
                                const extrasInfo = `Extras: ${extraDesayuno ? 'Desayuno, ' : ''}${extraSpa ? 'Spa, ' : ''}${extraTransporte ? 'Transporte' : ''}`;
                                const totalPagar = calcularTotal();
                                
                                const { data: nuevaReserva, error } = await supabase.from('reservaciones').insert({
                                    id_usuario: user.id,
                                    id_habitacion: dbRoomId,
                                    fecha_entrada: checkIn,
                                    fecha_salida: checkOut,
                                    numero_huespedes: 1, 
                                    precio_total: totalPagar,
                                    estado: 'pendiente', // Primero queda pendiente de pago
                                    notas: `Habitación: ${room.title} | ${extrasInfo}`
                                }).select().single();

                                if (error) {
                                    throw error;
                                }

                                // 3. Llamar a Stripe Edge Function
                                const { clientSecret } = await fetchPaymentSheetParams(totalPagar, nuevaReserva.id);

                                // 4. Inicializar Payment Sheet
                                const { error: initError } = await initPaymentSheet({
                                    merchantDisplayName: 'Crystal Cove Resort',
                                    paymentIntentClientSecret: clientSecret,
                                    defaultBillingDetails: {
                                        name: user.user_metadata?.full_name || 'Huésped',
                                    }
                                });

                                if (initError) {
                                    throw initError;
                                }

                                // 5. Presentar hoja de pago
                                const { error: paymentError } = await presentPaymentSheet();

                                if (paymentError) {
                                    Alert.alert("Pago cancelado", "Tu reservación ha quedado en estado pendiente en tu carrito/historial.");
                                    return;
                                }

                                // 6. Pago Exitoso -> Generar QR y Confirmar
                                const qrCodeStr = `QR-${nuevaReserva.id}`;
                                await supabase.from('reservaciones').update({ 
                                    estado: 'confirmada',
                                    codigo_qr: qrCodeStr 
                                }).eq('id', nuevaReserva.id);

                                Alert.alert("¡Reserva confirmada!", "El pago se acreditó y tu reserva está lista.", [
                                    { text: "Ver mis tickets", onPress: () => navigation.navigate('Reservas') }
                                ]);
                            } catch (error: any) {
                                Alert.alert("Error en el pago", error.message || "No se pudo procesar la reservación.");
                            } finally {
                                setIsSaving(false);
                            }
                        }}
                    >
                        <Text className="text-gray-800 dark:text-white font-bold text-lg font-sans">{isSaving ? 'Procesando...' : 'Confirmar Reserva'}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
