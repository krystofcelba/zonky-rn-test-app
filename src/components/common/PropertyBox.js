/* @flow */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string,
  value: string,
  color: string,
};

const PropertyBox = ({ title, value, color = 'black' }: Props) => (
  <View style={styles.container}>
    <Text style={[styles.title, { color }]}>{title}</Text>
    <Text style={[styles.value, { color }]}>{value}</Text>
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
