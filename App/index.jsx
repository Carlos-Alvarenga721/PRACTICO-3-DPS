import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, FlatList, Pressable, Modal, Image, Linking } from 'react-native';
import useStore from '../components/useStore';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect
import { A } from '@expo/html-elements';

// Recurso view in modal
function RecursoModal(props) {
  return (
    <>
      <View style={styles.containerImage}>
        {
          props.image ? null : <Text>No hay imagen</Text>
        }
        <Image source={{ uri: props.image }} style={styles.image} />
      </View>
      <View style={styles.modalContent}>
        <Text style={styles.titleModal}>Titulo: {props.title}</Text>
        <Text style={styles.textModal}>Descripcion: {props.description}</Text>
        <Text style={styles.textModal}>Tipo: {props.type}</Text>
      </View>
    </>
  );
}

const App = () => {
  const setResources = useStore((state) => state.setResources);
  const data = useStore((state) => state.resources);
  const [searchId, setSearchId] = useState('');
  const [searchedResource, setSearchedResource] = useState(null);

  // Resource component
  function Recurso(props) {
    return (
      <Pressable onPress={() => {
        setSearchedResource(props.item);
      }}>
        <View style={styles.row}>
          <View style={styles.columnId}>
            <Text style={styles.listTextId}>{props.index + 1}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.listText}>{props.title}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.listText}>{props.description}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.listText}>{props.type}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  // Data set function
  const dataGetter = async () => {
    try {
      const response = await axios.get('https://670801878e86a8d9e42dc45a.mockapi.io/api/recursos');
      setResources(response.data);
      console.log("API siendo llamada !!!!!!!!!!!!!!!!");
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all resources on mount
  useFocusEffect(
    useCallback(() => {
      dataGetter();
      setSearchedResource(null); // Clear searched resource on mount
    }, [])
  )

  // Function to search for a resource by ID
  const searchResourceById = async () => {
    try {
      const resourceWithId = data[searchId - 1]; // Get resource by ID
      setSearchedResource(resourceWithId);
    } catch (error) {
      console.error(error);
      setSearchedResource(null); // Clear searched resource on error
    }
  };

  // Function to navigate to the add resource screen
  const goToAddResource = () => {
    router.navigate('/addResource');
  };

  const goToEditResource = () => {
    router.navigate('/editResource', { resources: data });
    //navigate.navigate('/editResource', { resource });
  };

  // Function to show the list of resources
  const showResourceList = () => {
    setSearchedResource(null); // Clear searched resource to show the list
    setSearchId(''); // Clear the search ID input
  };

  const deleteResource = async (id) => {
    try {
      await axios.delete(`https://670801878e86a8d9e42dc45a.mockapi.io/api/recursos/${id}`);
      dataGetter(); // Fetch data again to update the list
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    showResourceList();
  };

  const handleEditModal = () => {
    goToEditResource();
    handleCloseModal();
  };

  const handleDeleteModal = () => {
    deleteResource(searchedResource.id);
    handleCloseModal();
  };

  const visitLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('Error opening URL:', err));
  };

  const handleVisitModal = (link) => {
    visitLink(link);
  };

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (data.length > useStore.getState().resources.length) {
    data = useStore.getState().resources;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Recursos</Text>
      <View style={styles.searchbox}>
        <TextInput
          placeholder="Buscar por ID"
          style={styles.input}
          value={searchId}
          onChangeText={setSearchId} // Update searchId state on input change
        />
        <Button title="Buscar" onPress={searchResourceById} />
      </View>
        <FlatList
          style={styles.list}
          data={data.slice()}
          renderItem={({ item, index }) => (
            <Recurso
              item={item}
              id={item.id}
              title={item.titulo}
              description={item.descripcion}
              type={item.tipo}
              index={index}
            />
          )}
          keyExtractor={(item) => item.id}
          extraData={data}
        />
      <View style={styles.btnRow}>
        <Pressable style={styles.btnAdd} onPress={goToAddResource}>
          <Text style={styles.textAdd}>Agregar</Text>
        </Pressable>
      </View>


      {/* Modal view to view resource information */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={searchedResource !== null}
      >
        <View style={styles.container}>
          {searchedResource ? (
            <>
              <RecursoModal
                title={searchedResource.titulo}
                description={searchedResource.descripcion}
                type={searchedResource.tipo}
                id={searchedResource.id}
                url={searchedResource.enlace}
                image={searchedResource.imagen}
              />
              <Pressable style={styles.btnVisit} onPress={() => {handleVisitModal(searchedResource.enlace)}}>
                <Text style={styles.textAdd}>Visitar</Text>
              </Pressable>

              <View style={styles.btnRow}>
                <Pressable style={styles.btnEdit} onPress={handleEditModal}>
                  <Text style={styles.textAdd}>Editar</Text>
                </Pressable>
                <Pressable style={styles.btnDelete} onPress={handleDeleteModal}>
                  <Text style={styles.textAdd}>Eliminar</Text>
                </Pressable>
              </View>
            </>
            ):(
              <Text style={styles.title}>No encontrado</Text>
            )
          }
          <Pressable style={styles.btnClose} title="Cerrar" onPress={handleCloseModal}>
            <Text style={styles.textAdd}>Cerrar</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchbox: {
    flexDirection: 'row',
    margin: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  column: {
    width: '25%',
    marginLeft: 10,
    marginRight: 10,
  },
  columnId: {
    width: '5%',
    marginLeft: 10,
    marginRight: 10,
  },
  listText: {
    fontSize: 12,
  },
  listTextId: {
    fontSize: 12,
    textAlign: 'right',
  },
  btnVisit: {
    backgroundColor: 'darkgrey',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: 20,
  },
  btnAdd: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  btnEdit: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDelete: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnClose: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 30,
  },
  textAdd: {
    color: 'white',
    fontWeight: 'bold',
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  modalContent: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80%',
  },
  titleModal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textModal: {
    fontSize: 14,
  },
});