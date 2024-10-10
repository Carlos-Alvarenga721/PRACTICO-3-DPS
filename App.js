import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from 'react-native';

function Recurso(props) {
  return (
    <View style={styles.row}>
      <Text style={styles.listText}>{props.id}</Text>
      <Text style={styles.listText}>{props.title}</Text>
      <Text style={styles.listText}>{props.description}</Text>
      <Text style={styles.listText}>{props.type}</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Recursos</Text>
      <View style={styles.searchbox}>
        <TextInput placeholder="Buscar" style={styles.input}/>
        <Button title="Buscar" style={styles.button}/>
      </View>
      <View style={styles.list}>
        <Recurso id="1" title="Recurso 1" description="Descripción del recurso 1" type="Tipo 1" enlace="Enlace del recurso 1" imagen="Imagen del recurso 1"/>
        <Recurso id="2" title="Recurso 2" description="Descripción del recurso 2" type="Tipo 2" enlace="Enlace del recurso 2" imagen="Imagen del recurso 2"/>
        <Recurso id="3" title="Recurso 3" description="Descripción del recurso 3" type="Tipo 3" enlace="Enlace del recurso 3" imagen="Imagen del recurso 3"/>
      </View>
    </SafeAreaView>
  );
}

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
    justifyContent: 'space-between',
  },
  listText: {
    fontSize: 12,
  },
});
