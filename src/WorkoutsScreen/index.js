import React, {useState} from 'react';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import TabBar from '../Components/TabBar';

import ListWorkouts from '../Calendar/ListWorkoutsScreen.js';

// import MessagesScreen from '../MessagesScreen';
import ProfileScreen from '../ProfileScreen';
import StatisticData from '../Statistic/StatisticData.js';
import StatisticDataDetails from '../Statistic/StatisticDataDetails.js';

const WorkoutStack = createStackNavigator();

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const ProfileStack = createStackNavigator();

const StatisticScreen = () => {
  return (
    <ProfileStack.Navigator initialRouteName="statistic-list">
      <ProfileStack.Screen
        name="statistic-list"
        component={StatisticData}
        options={{
          title: 'Статистика',
          headerBackVisible: false,
          headerLeft: () => null,
        }}
      />
      <ProfileStack.Screen
        name="statistic-details"
        component={StatisticDataDetails}
        options={{
          title: '??',
          // headerBackVisible: false,
          // headerLeft: () => null,
          headerLeft: (props) => {
            return <HeaderBackButton {...props} labelVisible={false} />;
          },
        }}
      />
    </ProfileStack.Navigator>
  );
};

const WorkoutsScreen = ({navigation}) => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="list"
        component={ListWorkouts}
        options={{
          tabBarLabel: 'Тренировки',
          icon: 'home',
          headerLeft: () => null,
          headerBackVisible: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Профиль',
          icon: 'contacts',
          headerLeft: () => null,
          headerBackVisible: false,
        }}
      />
      <Tab.Screen
        name="statistic"
        component={StatisticScreen}
        options={{title: 'Статистика', icon: 'linechart', headerShown: true}}
      />
    </Tab.Navigator>
  );
};

export default WorkoutsScreen;
