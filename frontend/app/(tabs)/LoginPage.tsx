import { BottomNavigation, BottomNavigationTab, Icon, IconElement, Layout } from '@ui-kitten/components'
import { Redirect } from 'expo-router'
import React, { useEffect, useState } from 'react'
import Signup from '../../components/Signup';
import Login from '../../components/Login';

import { ScrollView, StyleSheet } from 'react-native'
import { default as theme } from '../../app/theme.json'; // <-- Import app theme
import { useAppSelector } from '../../redux/store';
import { useSelector } from 'react-redux';


const LoginPage = () => {
  const user = useSelector((state: any) => state.user.user);

  const [selectedIndex, setSelectedIndex] = useState(0);

  if (user.username) return <Redirect href='/Profile' />

  const LoginIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='log-in-outline'
    />
  )

  const SignupIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='person-add-outline'
    />
  )


  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Layout style={styles.container}>
          {selectedIndex ? <Signup />
            : <Login />}
        </Layout>

        <BottomNavigation
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
          style={styles.tabs}

        >
          <BottomNavigationTab
            icon={LoginIcon}
            title='LOGIN'

          />
          <BottomNavigationTab
            icon={SignupIcon}
            title='SIGNUP'
          />

        </BottomNavigation>
      </ScrollView>
    </Layout>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme['color-info-200'],
  },
  tabs: {

  }
})