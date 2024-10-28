import { Input, Layout, Text, Button } from '@ui-kitten/components'
import React, { useState } from 'react'

import { StyleSheet } from 'react-native'
import { default as theme } from '../app/theme.json'; // <-- Import app theme
import { useDispatch } from 'react-redux';

import { login } from '../redux/user/UserSlice'

import { useAppDispatch } from '../redux/store';

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()

  const onLogin = () => {

    dispatch(login({username, password}))
  }

  return (
    <Layout style={styles.container}>
      <Text style={{ ...styles.text, fontWeight: 'bold', textAlign: 'center', fontSize: 25 }}>
        Login
      </Text>

      <Text style={styles.text}>Username</Text>
      <Input style={styles.input} onChangeText={(v) => setUsername(v)} placeholder='Username'></Input>

      <Text style={styles.text}>Password</Text>
      <Input style={styles.input} onChangeText={(v) => setPassword(v)} placeholder='Password'></Input>

      <Button style={styles.btn} onPress={onLogin} >Login</Button>
    </Layout>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 30,
    marginVertical: 50,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  text: {
    marginTop: 2,
    padding: 3,
  },
  input: {
    marginBottom: 5
  },
  btn: {
    width: '50%',
    marginTop: 10,
    marginHorizontal: 'auto'
  }
})