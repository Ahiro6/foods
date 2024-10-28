import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'

import { StyleSheet } from 'react-native'
import { default as theme } from '../app/theme.json'; // <-- Import app theme
import { useAppDispatch } from '../redux/store';
import { signup } from '../redux/user/UserSlice';

const Signup = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useAppDispatch()

  const onSignup = () => {
    dispatch(signup({username, firstname, surname, email, password}))
  }

  return (
    <Layout style={styles.container}>
      <Text style={{...styles.text, fontWeight: 'bold', textAlign: 'center', fontSize: 25}}>
        Signup
      </Text>

      <Text style={styles.text}>Username</Text>
      <Input onChangeText={(v) => setUsername(v)} placeholder='Username'></Input>

      <Text style={styles.text}>First Name</Text>
      <Input onChangeText={(v) => setFirstname(v)} placeholder='First Name'></Input>

      <Text style={styles.text}>Surname</Text>
      <Input onChangeText={(v) => setSurname(v)} placeholder='Surname'></Input>

      <Text style={styles.text}>Email</Text>
      <Input onChangeText={(v) => setEmail(v)} placeholder='Email'></Input>

      <Text style={styles.text}>Password</Text>
      <Input onChangeText={(v) => setPassword(v)} placeholder='Password'></Input>

      <Button style={styles.btn} onPress={onSignup} >Signup</Button>
    </Layout>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
      padding: 10,
      paddingBottom: 30,
      marginVertical: 50,
      marginHorizontal: 10,
      borderRadius: 10,
  },
  text: {
      marginTop: 7,
      padding: 3,

  },
  btn: {
    width: '50%',
    marginTop: 10,
    marginHorizontal: 'auto'
  }
})