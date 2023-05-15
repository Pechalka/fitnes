import React, {Fragment} from 'react';
import {View} from 'react-native';

import {Button, composeValidators, required, TextField} from '../Components';
import {updateUser, getUser} from '../redux/main';
import {useActions} from '../hooks';
import {useSelector} from 'react-redux';

import {Form} from 'react-final-form';

const UserData = ({navigation}) => {
  const user = useSelector(getUser);
  const actions = useActions({updateUser}, []);

  const onSubmit = (form) => {
    return actions
      .updateUser(user.id, {firstName: form.firstName, lastName: form.lastName})
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
          firstName: user.firstName,
          lastName: user.lastName,
        }}
        render={({handleSubmit, form, submitting, pristine, values}) => (
          <Fragment>
            <TextField
              name="firstName"
              label="Имя"
              validate={composeValidators(required)}
            />
            <TextField
              name="lastName"
              label="Фамилия"
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
    </View>
  );
};

export default UserData;
