import React from 'react';
import { View, Text } from 'react-native';

export default function Footer() {
    return (
        <View className="bg-gray-100 dark:bg-dark-surfaceAlt py-6 px-4 items-center">
            <Text className="text-gray-800 dark:text-white text-xs text-center mb-2 font-sans">© 2026 Crystal Cove. Todos los derechos reservados.</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-[10px] text-center font-sans">El diseño, contenido y cualquier material relacionado están protegidos por derechos de autor y no pueden ser reproducidos sin autorización previa.</Text>
        </View>
    );
}
