import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { ROOMS_DATA } from './Habitaciones';

const { width } = Dimensions.get('window');

export default function RoomDetails() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    
    // Buscar la información de la habitación
    const { roomId } = route.params || {};
    const room = ROOMS_DATA.find(r => r.id === roomId) || ROOMS_DATA[0];

    // Estados
    const [checkIn, setCheckIn] = useState<string>('');
    const [checkOut, setCheckOut] = useState<string>('');
    
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
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            
            {/* Header con botón atrás */}
            <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3 p-2">
                    <Ionicons name="arrow-back" size={24} color="#172554" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-blue-950 flex-1" numberOfLines={1}>{room.title}</Text>
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
                        <Text className="text-white text-xs font-bold">1 / 3</Text>
                    </View>
                </View>

                {/* Detalles de la habitación */}
                <View className="px-4 py-6">
                    <View className="flex-row justify-between items-start mb-2">
                        <Text className="text-2xl font-serif text-blue-950 flex-1 mr-4">{room.title}</Text>
                        <Text className="text-xl font-bold text-green-600">${room.price} <Text className="text-sm font-normal text-gray-500">/noche</Text></Text>
                    </View>
                    <Text className="text-gray-500 text-base leading-relaxed mb-6">{room.description}</Text>

                    {/* Qué incluye */}
                    <Text className="text-lg font-bold text-blue-950 mb-4">¿Qué incluye tu habitación?</Text>
                    <View className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-8">
                        {room.amenities.map((amenity: string, idx: number) => (
                            <View key={idx} className="flex-row items-center mb-3">
                                <Ionicons name="checkmark-circle" size={20} color="#16a34a" className="mr-3" />
                                <Text className="text-gray-700">{amenity}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Calendario */}
                    <Text className="text-lg font-bold text-blue-950 mb-2">Selecciona tus fechas</Text>
                    <Text className="text-gray-500 text-sm mb-4">Check-in / Check-out</Text>
                    
                    <View className="border border-gray-200 rounded-xl overflow-hidden mb-8">
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
                    <Text className="text-lg font-bold text-blue-950 mb-4">Servicios Extras</Text>
                    <View className="mb-8">
                        <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-gray-100">
                            <View className="flex-1 mr-4">
                                <Text className="font-bold text-gray-800">Desayuno Gourmet a la cama</Text>
                                <Text className="text-sm text-gray-500">+$35 por estadía</Text>
                            </View>
                            <Switch value={extraDesayuno} onValueChange={setExtraDesayuno} trackColor={{ false: '#d1d5db', true: '#93c5fd' }} thumbColor={extraDesayuno ? '#1d4ed8' : '#f3f4f6'} />
                        </View>
                        <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-gray-100">
                            <View className="flex-1 mr-4">
                                <Text className="font-bold text-gray-800">Masaje Relajante en Spa</Text>
                                <Text className="text-sm text-gray-500">+$120 por persona</Text>
                            </View>
                            <Switch value={extraSpa} onValueChange={setExtraSpa} trackColor={{ false: '#d1d5db', true: '#93c5fd' }} thumbColor={extraSpa ? '#1d4ed8' : '#f3f4f6'} />
                        </View>
                        <View className="flex-row justify-between items-center mb-4">
                            <View className="flex-1 mr-4">
                                <Text className="font-bold text-gray-800">Transporte VIP Aeropuerto</Text>
                                <Text className="text-sm text-gray-500">+$50 viaje redondo</Text>
                            </View>
                            <Switch value={extraTransporte} onValueChange={setExtraTransporte} trackColor={{ false: '#d1d5db', true: '#93c5fd' }} thumbColor={extraTransporte ? '#1d4ed8' : '#f3f4f6'} />
                        </View>
                    </View>

                </View>

                {/* Resumen Final */}
                <View className="bg-slate-900 p-6 rounded-t-3xl mt-4">
                    <Text className="text-white text-lg font-bold mb-4">Resumen de tu reserva</Text>
                    
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-300">Habitación</Text>
                        <Text className="text-white font-bold">${room.price} / noche</Text>
                    </View>
                    
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-300">Fechas seleccionadas</Text>
                        <Text className="text-white font-bold">{checkIn ? `${checkIn} al ${checkOut || '?'}` : 'Ninguna'}</Text>
                    </View>

                    <View className="flex-row justify-between mb-4 border-b border-gray-700 pb-4">
                        <Text className="text-gray-300">Servicios Extra</Text>
                        <Text className="text-white font-bold">${(extraDesayuno ? 35 : 0) + (extraSpa ? 120 : 0) + (extraTransporte ? 50 : 0)}</Text>
                    </View>

                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-white text-xl font-bold">Total Estimado</Text>
                        <Text className="text-green-400 text-2xl font-bold">${calcularTotal()}</Text>
                    </View>

                    <TouchableOpacity 
                        className="bg-blue-600 py-4 rounded-xl items-center"
                        onPress={() => {
                            if(!checkIn || !checkOut) {
                                Alert.alert("Faltan fechas", "Por favor selecciona una fecha de Check-in y Check-out.");
                            } else {
                                Alert.alert("¡Reserva confirmada!", "Tu reserva ha sido procesada con éxito.");
                            }
                        }}
                    >
                        <Text className="text-white font-bold text-lg">Confirmar Reserva</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
