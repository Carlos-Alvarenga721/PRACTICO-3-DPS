// App/EditScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios';
import useStore from '../components/useStore';
import { Alert } from 'react-native';
import { router } from 'expo-router';


const EditScreen = () => {
  const resource = useStore((state) => state.searchedResourceInStore);
  const [title, setTitle] = useState(resource?.titulo || '');
  const [description, setDescription] = useState(resource?.descripcion || '');
  const [type, setType] = useState(resource?.tipo || '');
  const [url, setUrl] = useState(resource?.enlace || '');
  const [imageUrl, setImageUrl] = useState(resource?.imagen || '');

  function goBack() {
    router.back();
  }

  async function handleUpdateResource() {
    try {
      const response = await axios.put(`https://670801878e86a8d9e42dc45a.mockapi.io/api/recursos/${resource.id}`, {
        titulo: title,
        descripcion: description,
        tipo: type,
        enlace: url,
        imagen: imageUrl,
      });
      console.log(response.data);
      goBack();
    } catch (error) {
        console.error(error); 
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Modifica los datos que deseas</Text>

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
        keyboardType="email-address"
      />

    <Text style={styles.inputLabel}>Enlance</Text>
      <TextInput
        style={styles.input}
        placeholder="Enlance"
        value={url}
        onChangeText={setUrl}
        keyboardType="email-address"
      />

    <Text style={styles.inputLabel}>Imagen</Text>
      <TextInput
        style={styles.input}
        placeholder="Imagen"
        value={imageUrl}
        onChangeText={setImageUrl}
        keyboardType="email-address"
      />

      <Button title="Modificar Recurso" onPress={(handleUpdateResource)} />
    </ScrollView>
  );
};

export default EditScreen;

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
    marginBottom: 10,
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
