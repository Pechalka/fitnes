import React, {useState, useMemo, Fragment} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  // Button,
  TextInput,
} from 'react-native';

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';

import {Button} from '../Components';

import {findCode, createUser} from '../redux/main';
import {useActions} from '../hooks';

let _code = null;

const LoginByCodeScreen = ({navigation}) => {
  const [codeExist, setCodeExist] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);

  const [code, onChangeCode] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const actions = useActions({findCode, createUser}, []);

  const handleJoin = () => {
    actions.findCode(code).then((response) => {
      _code = response.code;

      setCodeExist(response.success);
      setErrorMessage(!response.success ? 'Нет кода доступа' : '');
      setEmailEmpty(false);
      setPasswordEmpty(false);
    });
  };

  const handleCreate = () => {
    if (!email) {
      setEmailEmpty(true);
      return;
    } else {
      setEmailEmpty(false);
    }
    if (!password) {
      setPasswordEmpty(true);
      return;
    } else {
      setEmailEmpty(false);
    }

    actions.createUser(email, password, _code).then(() => {
      navigation.navigate('LoginByEmailScreen');
      setEmailEmpty(false);
      setPasswordEmpty(false);
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon
        name="left"
        style={{
          color: '#2B2B2B',
          position: 'absolute',
          top: 60,
          left: 20,
          // backgroundColor: 'red',
        }}
        size={30}
        onPress={() => {
          navigation.goBack();
        }}
      />
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
          onChangeText={onChangeCode}
          value={code}
          placeholder="Код"
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
        {codeExist ? (
          <Fragment>
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
            {emailEmpty ? (
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 10,
                  marginTop: 6,
                  color: '#FB0000',
                }}>
                email должен быть заполнен
              </Text>
            ) : null}
          </Fragment>
        ) : null}
        {codeExist ? (
          <Fragment>
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
            />
            {passwordEmpty ? (
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 10,
                  marginTop: 6,
                  color: '#FB0000',
                }}>
                пароль должен быть заполнен
              </Text>
            ) : null}
          </Fragment>
        ) : null}
      </View>
      {!codeExist ? (
        <Button
          label="Получить доступ"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleJoin}
        />
      ) : (
        <Button
          label="Сохранить"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleCreate}
        />
      )}
    </View>
  );
};

export default LoginByCodeScreen;
