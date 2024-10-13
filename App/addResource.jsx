import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import axios from 'axios';
import useStore from '../components/useStore';
import { router } from 'expo-router';

export default function addResource() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const resources = useStore((state) => state.resources);
    const setResources = useStore((state) => state.setResources);
    
    function goBack() {
        router.back();
    }

    function handleAddResource() {
        if(!title || !description || !type || !url || !imageUrl) {
            alert('Por favor, llena todos los campos');
            return;
        }
        try {
            axios.post('https://670801878e86a8d9e42dc45a.mockapi.io/api/recursos', {
                titulo: title,
                descripcion: description,
                tipo: type,
                enlace: url,
                imagen: imageUrl,
            });
            goBack();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar nuevo recurso</Text>
            <TextInput style={styles.input} placeholder="Titulo" value={title} onChangeText={setTitle}/>
            <TextInput style={styles.input} placeholder="Descripcion" value={description} onChangeText={setDescription} />
            <TextInput style={styles.input} placeholder="Tipo" value={type} onChangeText={setType} />
            <TextInput style={styles.input} placeholder="Url" value={url} onChangeText={setUrl} />
            <TextInput style={styles.input} placeholder="Url de la imagen" value={imageUrl} onChangeText={setImageUrl} />
            <Pressable style={styles.btnAdd} onPress={handleAddResource}>
                <Text style={styles.textAdd}>Agregar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    btnAdd: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    textAdd: {
        color: 'white',
    },
});
