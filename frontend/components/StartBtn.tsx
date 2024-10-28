import { Button, Layout } from '@ui-kitten/components'
import React from 'react'

import { default as theme } from '../app/theme.json'; // <-- Import app theme

import { StyleSheet } from 'react-native'
import { useAppDispatch } from '../redux/store';
import { startWeekScore } from '../redux/weekscores/WeekScoresSlice';
import { useSelector } from 'react-redux';
import { Redirect } from 'expo-router';

const StartBtn = () => {

    const user = useSelector((state: any) => state.user.user);

    const dispatch = useAppDispatch()

    const onStart = () => {
        if (!user.username) return <Redirect href='/LoginPage'/>
        dispatch(startWeekScore({}))
    }

    return (
        <Layout style={styles.container}>
            <Button status='success' style={styles.btn} onPress={onStart}>
                START YOUR WEEK
            </Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: theme['color-info-100'],

    },
    btn: {
        width: 200,
        margin: 'auto'
    }
})

export default StartBtn