import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PlcCard = ({ device, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>
        {device.modelName} ({device.brand})
      </Text>
      <Text>
        類型: {device.type === 0 ? '其它' : device.type === 1 ? 'PLC' : 'HMI'}
      </Text>
      <Text style={styles.sub}>
        建立時間: {new Date(device.createdTime).toLocaleString()}
      </Text>
      <Text>狀態: {device.status === 0 ? '可借用' : '借出中'}</Text>
      <Text>使用者: {device.userName || '-'}</Text>
      <Text>位置: {device.location || '-'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sub: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

export default PlcCard;
