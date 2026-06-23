import React from 'react';
import { View, Text } from 'react-native';

export default function Footer() {
    return (
        <View className="bg-slate-900 py-6 px-4 items-center">
            <Text className="text-white text-xs text-center mb-2">© 2026 Crystal Cove. Todos los derechos reservados.</Text>
            <Text className="text-gray-400 text-[10px] text-center">El diseño, contenido y cualquier material relacionado están protegidos por derechos de autor y no pueden ser reproducidos sin autorización previa.</Text>
        </View>
    );
}
