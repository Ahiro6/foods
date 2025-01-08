import { Layout, List } from '@ui-kitten/components'
import React, { useState } from 'react'
import FruitItem from './FruitItem';
import { default as theme } from '../app/theme.json'; // <-- Import app theme

import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

const FruitList = () => {

    const { fruitList } = useSelector((state: any) => state.weekScores.week)

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
                renderItem={FruitItem}
                data={fruitList.fruits}
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

export default FruitList