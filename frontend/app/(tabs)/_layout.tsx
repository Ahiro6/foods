import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { default as theme } from '../theme.json'; // <-- Import app theme
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { getUser } from '../../redux/user/UserSlice';

export default function TabLayout() {

  const dispatch = useAppDispatch()

  const { user, message } = useSelector((state: any) => state.user)

  useEffect(() => {
    if(!user.username) {
      dispatch(getUser({}))
    }
  }, [dispatch])

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }} >
      <Tabs.Screen
        name="index"
        options={{
          title: message,
          tabBarInactiveBackgroundColor: theme['color-success-300'],
          tabBarActiveBackgroundColor: theme['color-success-500'],
          tabBarIcon: () => <FontAwesome size={28} name="home" color={theme['color-warning-300']} />,
          href: !user ? null : {
            pathname: '/'
          }
        }}

      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: message,
          tabBarInactiveBackgroundColor: theme['color-success-300'],
          tabBarActiveBackgroundColor: theme['color-success-500'],
          tabBarIcon: () => <FontAwesome size={28} name={"user-circle"} color={theme['color-warning-300']} />,
          href: !user ? null : {
            pathname: '/Profile'
          }
        }}
      />
      <Tabs.Screen
        name="LoginPage"
        options={{
          title: message,
          tabBarInactiveBackgroundColor: theme['color-success-300'],
          tabBarActiveBackgroundColor: theme['color-success-500'],
          tabBarIcon: () => <FontAwesome size={28} name={"user-circle"} color={theme['color-warning-300']} />,
          href: user ? null : {
            pathname: '/LoginPage'
          }
        }}
      />
    </Tabs>
  );
}