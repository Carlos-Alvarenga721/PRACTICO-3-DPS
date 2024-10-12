import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Inicio' }}/>
            <Stack.Screen name="addResource" options={{ title: 'Agregar recurso' }} />
            <Stack.Screen name="editResource" options={{ title: 'Editar recurso' }} />
        </Stack>
    )
}
