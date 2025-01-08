import { Layout } from '@ui-kitten/components'
import React from 'react'

import { View } from 'react-native'
import ProfileBar from '../../components/ProfileBar'
import WeekList from '../../components/WeekList'
import { Redirect } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getDemo } from '../../redux/user/UserSlice'

interface User {
  user: {
    username: string,
    email: string,
    firstname: string,
    surname: string,
    password: string,
  }
}

const Profile = () => {

  const user = useSelector((state: any) => state.user.user);

  if (!user.username) return <Redirect href='/LoginPage' />

  return (
    <Layout>
      <ProfileBar username={user.username} streak={user.streak} />
      <WeekList />
    </Layout>
  )
}



export default Profile