import React, {useState} from 'react';
import {View} from 'react-native';

import {Tabs, Tab} from '../Components';

import AuthData from './AuthData';
import UserData from './UserData';

const ProfileScreen = ({navigation}) => {
  const [tab, setTab] = useState('profile');

  return (
    <View style={{flex: 1}}>
      <Tabs>
        <Tab
          label="Пользователь"
          isActive={tab === 'profile'}
          onPress={() => setTab('profile')}
        />
        <Tab
          label="Атроризация"
          isActive={tab === 'auth'}
          onPress={() => setTab('auth')}
        />
      </Tabs>
      {tab === 'profile' ? <UserData navigation={navigation} /> : null}
      {tab === 'auth' ? <AuthData navigation={navigation} /> : null}
    </View>
  );
};

export default ProfileScreen;
