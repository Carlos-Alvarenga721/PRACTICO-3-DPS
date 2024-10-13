import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { useSearchParams, router } from 'expo-router';
import useStore from '../components/useStore';

export default function EditScreen() {
    // Obtener los parámetros de la URL usando useSearchParams
    const { id, currentTitle, currentDescription, currentType, currentUrl, currentImageUrl } = useSearchParams();

    const [title, setTitle] = useState(currentTitle || '');
    const [description, setDescription] = useState(currentDescription || '');
    const [type, setType] = useState(currentType || '');
    const [url, setUrl] = useState(currentUrl || '');
    const [imageUrl, setImageUrl] = useState(currentImageUrl || '');

    const resources = useStore((state) => state.resources);
    const setResources = useStore((state) => state.setResources);

    function goBack() {
        router.back();
    }

    function handleEditResource() {
        if (!title || !description || !type || !url || !imageUrl) {
            alert('Por favor, llena todos los campos');
            return;
        }
        try {
            axios.put(`https://670801878e86a8d9e42dc45a.mockapi.io/api/recursos/${id}`, {
                titulo: title,
                descripcion: description,
                tipo: type,
                enlace: url,
                imagen: imageUrl,
            })
            .then(() => {
                goBack();
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Modifica los datos del recurso</Text>

            <Text style={styles.inputLabel}>Título</Text>
            <TextInput
                style={styles.input}
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.inputLabel}>Descripción</Text>
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.inputLabel}>Tipo</Text>
            <TextInput
                style={styles.input}
                placeholder="Tipo"
                value={type}
                onChangeText={setType}
            />

            <Text style={styles.inputLabel}>Enlace</Text>
            <TextInput
                style={styles.input}
                placeholder="Enlace"
                value={url}
                onChangeText={setUrl}
            />

            <Text style={styles.inputLabel}>Imagen</Text>
            <TextInput
                style={styles.input}
                placeholder="URL de la Imagen"
                value={imageUrl}
                onChangeText={setImageUrl}
            />

            <Button title="Modificar Recurso" onPress={handleEditResource} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputLabel: {
        fontSize: 16,
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
    },
});
