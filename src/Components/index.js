import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

export const Button = ({onPress, label, style, textStyle}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: '#2B2B2B',
        padding: 10,
        borderRadius: 10,
        minWidth: 128,
        alignItems: 'center',
        ...style,
      }}>
      <Text
        style={{
          color: '#fff',
          fontSize: 15,
          ...textStyle,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

import {Form, Field} from 'react-final-form';

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
    ? undefined
    : 'email неверный';
};

export const required = (value) => (value ? undefined : 'обязательное поле');
export const mustBeNumber = (value) =>
  isNaN(value) ? 'Должно быть числом' : undefined;
export const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Должно быть больше ${min}`;
export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const TextField = ({name, defaultValue = '', validate, label}) => {
  return (
    <Field name={name} defaultValue={defaultValue} validate={validate}>
      {({input, meta}) => {
        const hasErrro = (meta.error || meta.submitError) && meta.touched;
        return (
          <View
            style={{
              margin: 20,
              marginRight: 30,
              marginLeft: 30,
              marginBottom: 0,
            }}>
            <TextInput
              style={{
                // height: 40,
                borderColor: hasErrro ? 'red' : 'gray',
                backgroundColor: '#fff',
                borderWidth: 1,
                padding: 10,
              }}
              onChangeText={input.onChange}
              value={input.value}
              placeholder={label}
            />
            {hasErrro ? (
              <Text
                style={{
                  fontSize: 20,
                  lineHeight: 20,
                  color: 'red',
                  marginTop: 5,
                }}>
                {meta.error || meta.submitError}
              </Text>
            ) : null}
          </View>
        );
      }}
    </Field>
  );
};

export const Tab = ({label, onPress, isActive}) => (
  <TouchableOpacity
    style={
      isActive
        ? {
            borderBottomWidth: 1,
            borderBottomColor: '#000',
          }
        : {}
    }
    onPress={() => onPress()}>
    <Text
      style={{
        fontSize: 24,
      }}>
      {label}
    </Text>
  </TouchableOpacity>
);

export const Tabs = ({children}) => (
  <View
    style={{
      // margin: 30,
      marginLeft: 30,
      marginRight: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
    {children}
  </View>
);
