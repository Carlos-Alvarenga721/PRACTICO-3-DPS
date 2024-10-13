// App/EditScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios';
import useStore from '../components/useStore';
import { useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';


const EditScreen = () => {
  const route = useRoute(); // Utiliza useRoute para acceder a las props de navegación
  const { resource } = route.params || {}; // Extrae el recurso de los params
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const resources = useStore((state) => state.resources);
    const setResources = useStore((state) => state.setResources);

    /* // 2. SE AGREGA: useEffect para cargar los datos del recurso seleccionado al montar el componente.
     useEffect(() => {
      if (resources) { // Verificamos si existe un recurso para evitar errores.
          setTitle(resources.titulo);
          setDescription(resources.descripcion);
          setType(resources.tipo);
          setUrl(resources.enlace);
          setImageUrl(resources.imagen);
      }
    }, [resources]); // Dependencia: se ejecuta cada vez que "resource" cambia.*/

    async function handleUpdateResource() {
        try {
            const response = await axios.put('https://670801878e86a8d9e42dc45a.mockapi.io/api/recursos/${resource.id}', {
                titulo: title,
                descripcion: description,
                tipo: type,
                enlace: url,
                imagen: imageUrl,
            });

              // 4. SE AGREGA: Actualizar el estado global de recursos con la respuesta del servidor.
              setResources((prevResources) =>
                prevResources.map((res) => (res.id === response.data.id ? response.data : res))
            );

            // Mostrar una alerta de éxito
            Alert.alert('Éxito', 'Recurso modificado con éxito');

        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo modificar el recurso. Intente nuevamente.');
          
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
