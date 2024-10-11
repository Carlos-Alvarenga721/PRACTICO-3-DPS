import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Recurso({ id, title, description, type }) {
  return (
    <View style={styles.row}>
      <View style={styles.columnId}>
        <Text style={styles.listTextId}>{id}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.listText}>{title}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.listText}>{description}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.listText}>{type}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default Recurso;
