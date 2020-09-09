import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';


const Button = ({ onPress, label, style }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ backgroundColor: '#841584', padding: 10, borderRadius: 4, ...style }}>
        <Text style={{ color: '#fff' }}>{label}</Text>
    </TouchableOpacity>
  )
}

export {
	Button
}