import { View, Text, ScrollView } from 'react-native';

export default function Home() {
    return(
        <>
        <ScrollView>
            <View className=" bg-blue-950 flex-1 items-center justify-center">
                <Text className="text-center text-white text-2xl font-bold"> En {`\n`} Crystal Cove {`\n`} encuentra {`\n`} tranquilidad</Text>
            </View>
            <View>
                <Text className="text-center text-white text-2xl font-bold">Servicios y Amenidades</Text>
            </View>
        </ScrollView>
        </>
    )
}