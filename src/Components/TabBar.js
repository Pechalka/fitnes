import * as React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

function TabBar({state, descriptors, navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        //dumbbell
        {
          /* name="caretright"
                  size={30}
                  color="#fff"*/
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopWidth: 1,
              borderTopColor: '#9F9D9D',
              backgroundColor: '#2B2B2B',
            }}>
            {options.icon && (
              <Icon
                name={options.icon}
                style={{color: isFocused ? '#FF7800' : '#9F9D9D'}}
                size={20}
              />
            )}
            <Text style={{color: isFocused ? '#FF7800' : '#9F9D9D'}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;
