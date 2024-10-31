import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { default as theme } from '../theme.json'; // <-- Import app theme
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { getUser } from '../../redux/user/UserSlice';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function TabLayout() {

  const dispatch = useAppDispatch()

  const { user, userMessage } = useSelector((state: any) => state.user)
  const { apiMessage } = useSelector((state: any) => state.api)
  const { weekMessage } = useSelector((state: any) => state.weekScores)

  const message = userMessage ? userMessage : (weekMessage ? weekMessage: apiMessage)

  useEffect(() => {
    if (!user.username) {
      dispatch(getUser({}))
    }
  }, [dispatch])

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }} >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: '',
          headerTitle: message,
          headerTitleStyle: {
            fontSize: 15,
          },
          tabBarInactiveBackgroundColor: theme['color-success-300'],
          tabBarActiveBackgroundColor: theme['color-success-500'],
          tabBarIcon: () => <FontAwesome size={28} name="home" color={theme['color-warning-300']} />,
          href: !user ? null : {
            pathname: '/'
          },

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
        }

        }}

      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: '',
          headerTitle: message,
          headerTitleStyle: {
            fontSize: 15,
            width: '400%',
            textAlign: 'center',
          },
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
          tabBarLabel: '',
          headerTitle: message,
          headerTitleStyle: {
            fontSize: 15,
            width: '400%',
            textAlign: 'center',
          },
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