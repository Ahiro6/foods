import React, { FC, useEffect, useState } from 'react'

import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import SearchBar from '../../components/SearchBar'
import NavBar from '../../components/NavBar'
import { Layout, Text } from '@ui-kitten/components'
import ProgressBar from '../../components/ProgressBar'
import FruitList from '../../components/FruitList'
import { default as theme } from '../theme.json'; // <-- Import app theme
import { Redirect } from 'expo-router'
import StartBtn from '../../components/StartBtn'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import { getWeekScore } from '../../redux/weekscores/WeekScoresSlice'

const Home = (): JSX.Element => {

  const { user } = useSelector((state: any) => state.user);

  if (!user) return <Redirect href='/LoginPage' />

  const daysLeft = (date: Date) => {
    const currDate = new Date()
    const startDate = new Date(date)

    return startDate.getDate() + 7 - currDate.getDate() 
  }

  const { week } = useSelector((state: any) => state.weekScores)
  const notice = week.weekScores.length ?
    `${daysLeft(week.weekScores[0].weekStart)} days left`
    : 'You have not started a week.'


  const dispatch = useAppDispatch()

  useEffect(() => {

    dispatch(getWeekScore({}))

  }, [dispatch])

  return (
    <Layout style={{ backgroundColor: theme['color-info-200'] }}>
      <SearchBar />
      {!week.weekScores[0]?.onGoing ? <StartBtn /> : <></>}
      {week.weekScores.length != 0 ? <ProgressBar streak={user.streak} score={week.weekScores[0].score} />
        : <></>}
      <Layout style={styles.noticeContainer}>
        <Text style={styles.notice}>{notice}</Text>
      </Layout>
      <FruitList />
    </Layout>
  )
}

const styles = StyleSheet.create({

  notice: {
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: theme['color-info-100']
  },

  noticeContainer: {
    backgroundColor: theme['color-info-100']
  }
});

export default Home