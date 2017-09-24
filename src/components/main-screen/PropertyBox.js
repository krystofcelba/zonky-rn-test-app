/* @flow */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string,
  value: string,
};

const PropertyBox = ({ title, value }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  title: { fontSize: 10, fontWeight: 'bold', textAlign: 'center', marginBottom: 2 },
  value: { fontSize: 13, textAlign: 'center' },
});

export default PropertyBox;
