import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainContext} from '../contexts/MainContext';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../views/Home';
import Login from '../views/Login';
import Single from '../views/Single';
import Profile from '../views/Profile';
import Upload from '../views/Upload';
import MyFiles from '../views/MyFiles';
import Modify from '../views/Modify';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26}/>
          ),
        }}
        name="Home"
        component={Home}/>
      <Tab.Screen
        options={{
          tabBarLabel: 'Upload',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="upload" color={color} size={26}/>
          ),
        }}
        name="Upload"
        component={Upload}/>
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26}/>
          ),
        }}
        name="Profile"
        component={Profile}/>
    </Tab.Navigator>
  );
};

const StackScreen = () => {

  const {isLoggedIn} = useContext(MainContext);

  return (
    isLoggedIn ? (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Tabs"
                      component={TabScreen}/>
        <Stack.Screen name="Single" component={Single}/>
        <Stack.Screen name="MyFiles" component={MyFiles}/>
        <Stack.Screen name="Modify" component={Modify}/>
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
