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

  // Data set function
  function dataGetter() {

    axios.get('https://670801878e86a8d9e42dc45a.mockapi.io/api/recursos')
    .then(function (response) {
      console.log(response.data);
      setResources(response.data);
    })
  }

  // Call the dataGetter function only once
  useEffect(() => {
    dataGetter();
  }
  , []);
  

  const data = useStore((state) => state.resources);
  if(data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Recursos</Text>
      <View style={styles.searchbox}>
        <TextInput placeholder="Buscar" style={styles.input}/>
        <Button title="Buscar" style={styles.button}/>
      </View>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item }) => (
          <Recurso id={item.id} title={item.titulo} description={item.descripcion} type={item.tipo} enlace={item.enlace} imagen={item.imagen}/>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

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
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
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
  }
});
