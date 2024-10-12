// App/EditScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';

const EditScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

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
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

    <Text style={styles.inputLabel}>Enlance</Text>
      <TextInput
        style={styles.input}
        placeholder="Enlance"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

    <Text style={styles.inputLabel}>Imagen</Text>
      <TextInput
        style={styles.input}
        placeholder="Imagen"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Button title="Modificar Recurso" onPress={() => {}} />
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
