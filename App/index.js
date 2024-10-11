import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, FlatList } from 'react-native';
import useStore from '../useStore';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Resource component
function Recurso(props) {
  return (
    <View style={styles.row}>
      <View style={styles.columnId}>
        <Text style={styles.listTextId}>{props.id}</Text>
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
  );
}

const App = () => {
  const setResources = useStore((state) => state.setResources);
  const data = useStore((state) => state.resources);
  const [searchId, setSearchId] = useState('');
  const [searchedResource, setSearchedResource] = useState(null);

  // Data set function
  const dataGetter = async () => {
    try {
      const response = await axios.get('https://670801878e86a8d9e42dc45a.mockapi.io/api/recursos');
      setResources(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all resources on mount
  useEffect(() => {
    dataGetter();
  }, []);

  // Function to search for a resource by ID
  const searchResourceById = async () => {
    try {
      const response = await axios.get(`https://670801878e86a8d9e42dc45a.mockapi.io/api/recursos/${searchId}`);
      setSearchedResource(response.data);
    } catch (error) {
      console.error(error);
      setSearchedResource(null); // Clear searched resource on error
    }
  };

  // Function to show the list of resources
  const showResourceList = () => {
    setSearchedResource(null); // Clear searched resource to show the list
    setSearchId(''); // Clear the search ID input
  };

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
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
      {searchedResource ? (
        <>
          <Recurso
            id={searchedResource.id}
            title={searchedResource.titulo}
            description={searchedResource.descripcion}
            type={searchedResource.tipo}
          />
          <Button title="Mostrar lista de recursos" onPress={showResourceList} />
        </>
      ) : (
        <FlatList
          style={styles.list}
          data={data.slice(0, 10)} // Show only the first 10 resources
          renderItem={({ item }) => (
            <Recurso
              id={item.id}
              title={item.titulo}
              description={item.descripcion}
              type={item.tipo}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
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
    paddingVertical: 50,
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
});
