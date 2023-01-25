import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../views/Home';
import Login from '../views/Login';
import Single from '../views/Single';
import Profile from '../views/Profile';
import {MainContext} from '../contexts/MainContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>
  );
};

const StackScreen = () => {

  const {isLoggedIn} = useContext(MainContext);

  return (
    isLoggedIn ? (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Tabs" component={TabScreen}/>
        <Stack.Screen name="Single" component={Single}/>
      </Stack.Navigator>
    ) : (
      <Stack.Navigator>
        <Stack.Screen name="Welcome!" component={Login}/>
      </Stack.Navigator>
    )
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen/>
    </NavigationContainer>
  );
};

export default Navigator;
