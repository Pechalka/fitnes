import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  // Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import {Button} from '../Components';

import {login} from '../redux/main';
import {useActions} from '../hooks';

import Logo from './Logo2';
import Icon from 'react-native-vector-icons/AntDesign';

const LoginByEmailScreen = ({navigation}) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const actions = useActions({login}, []);

  const handleLogin = () => {
    actions
      .login(email, password)
      .then(() => {
        navigation.navigate('Workouts');
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Icon
        name="right"
        style={{
          color: '#2B2B2B',
          position: 'absolute',
          top: 60,
          right: 20,
        }}
        size={30}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Logo />

      <View style={{width: '70%', paddingBottom: 15}}>
        <TextInput
          style={{
            borderRadius: 10,
            borderColor: errorMessage ? '#FB0000' : 'rgba(0, 0, 0, 0.75)',
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            borderWidth: 1,
            marginTop: 10,
            padding: 10,
            fontSize: 15,
          }}
          placeholderTextColor={'#A7A7A7'}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="email"
        />

        <TextInput
          style={{
            borderRadius: 10,
            borderColor: errorMessage ? '#FB0000' : 'rgba(0, 0, 0, 0.75)',
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            borderWidth: 1,
            marginTop: 10,
            padding: 10,
            fontSize: 15,
          }}
          placeholderTextColor={'#A7A7A7'}
          onChangeText={onChangePassword}
          value={password}
          placeholder="пароль"
          secureTextEntry={true}
        />
        {errorMessage ? (
          <Text
            style={{
              fontSize: 10,
              lineHeight: 10,
              marginTop: 6,
              color: '#FB0000',
            }}>
            {errorMessage}
          </Text>
        ) : null}
      </View>
      <Button label="Вход" onPress={handleLogin} />
    </View>
  );
};

export default LoginByEmailScreen;
