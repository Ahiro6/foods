import { Layout, List } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import WeekItem from './WeekItem';
import { default as theme } from '../app/theme.json'; // <-- Import app theme

import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { getWeekScores } from '../redux/weekscores/WeekScoresSlice';
import { useAppDispatch } from '../redux/store';

const WeekList = () => {

    const { week } = useSelector((state: any) => state.weekScores)

    const dispatch = useAppDispatch()

    useEffect(() => {

        dispatch(getWeekScores({}))

      }, [dispatch])

    const [color, setColor] = useState(theme['color-info-400'])

    const toggleColor = () => {
        if (color == theme['color-info-400']) {
            setColor(theme['color-success-500'])
            return
        }
        setColor(theme['color-info-400'])
    }

    return (
        <Layout style={styles.container}>
            <List style={{ ...styles.list, borderTopColor: color }}
                renderItem={WeekItem}
                data={week.weekScores}
                onPointerEnter={toggleColor}
                onPointerLeave={toggleColor}
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: theme['color-info-100'],

    },
    list: {
        borderTopWidth: 5
        
    }
})

export default WeekList