import React, {Fragment} from 'react';
import {View} from 'react-native';

import {
  Button,
  TextField,
  composeValidators,
  required,
  validateEmail,
} from '../Components';
import {logout, updateUser, getUser} from '../redux/main';
import {useActions} from '../hooks';
import {useSelector} from 'react-redux';

import {Form} from 'react-final-form';

const AuthData = ({navigation}) => {
  const user = useSelector(getUser);
  const actions = useActions({updateUser, logout}, []);

  const handleLogin = () => {
    actions.logout(navigation);
  };

  const onSubmit = (form) => {
    return actions
      .updateUser(user.id, {email: form.email, password: form.password})
      .catch((e) => {
        return Promise.resolve({
          email: 'email должно быть уникальным',
        });
      });
  };

  return (
    <View style={{flex: 1}}>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          email: user.email,
          password: user.password,
        }}
        render={({handleSubmit, form, submitting, pristine, values}) => (
          <Fragment>
            <TextField
              name="email"
              label="email"
              validate={composeValidators(required, validateEmail)}
            />
            <TextField
              name="password"
              label="пароль"
              validate={composeValidators(required)}
            />
            <Button
              label="Обновить"
              style={{
                margin: 20,
                marginLeft: 30,
                marginRight: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              textStyle={{fontSize: 24}}
              onPress={handleSubmit}
            />
          </Fragment>
        )}
      />
      <Button
        label="Выход"
        style={{
          margin: 20,
          marginLeft: 30,
          marginRight: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 'auto',
        }}
        textStyle={{fontSize: 24}}
        onPress={handleLogin}
      />
    </View>
  );
};

export default AuthData;
