import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {Button} from '../Components';

import Logo from './Logo2';

const LoginScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
      }}>
      <Logo />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 'auto',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 90,
          left: 50,
          right: 50,
        }}>
        <Button
          label="Вход"
          onPress={() => navigation.navigate('LoginByEmailScreen')}
        />
        <Button
          label="Код доступа"
          onPress={() => navigation.navigate('LoginByCodeScreen')}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
