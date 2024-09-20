import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterSreen';
import SettingsScreen from './SettingScreen';
import TasksScreen from './TasksSreen';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen} 
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>

);

  const BottomTabNavigator = () => {
    const user = useSelector((state) => state.auth.user);

    return (
      <NavigationContainer>
        {user ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                switch (route.name) {
                  case 'Tasks':
                    iconName = 'clipboard-text';
                    break;
                  case 'Settings':
                    iconName = 'cog';
                    break;
                  default:
                    iconName = 'circle';
                }

                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#4F75FF',
              tabBarInactiveTintColor: '#9CA3AF',
              tabBarStyle: {
                backgroundColor: '#FFFFFF',
                borderTopWidth: 0,
                elevation: 0,
              },
              headerStyle: {
                backgroundColor: '#4F75FF',
              },
              headerTintColor: '#FFFFFF',
            })}
          >
            <Tab.Screen name="Tasks" component={TasksScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    );
  };

export default BottomTabNavigator;
