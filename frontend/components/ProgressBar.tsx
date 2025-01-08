import { CircularProgressBar, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { default as theme } from '../app/theme.json'; // <-- Import app theme
import StreakIcon from './StreakIcon';

const ProgressBar = ({ score, streak }: {score: number, streak: number}) => {

    const progress = score/30

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
            <Layout style={{...styles.innerContainer, borderBottomColor: color}} onPointerEnter={toggleColor} onPointerLeave={toggleColor}>
                <Layout style={styles.count}>
                    <Text category='h6' style={{textAlign: 'center'}}>
                        Count
                    </Text>
                    <Text category='h6' style={{textAlign: 'center'}}>
                        #{score}
                    </Text>
                </Layout>

                <CircularProgressBar
                    style={{ ...styles.progressBar, backgroundColor: progress >= 1 ? theme['color-success-200'] : theme['color-info-100'] }}
                    progress={progress}
                    status='success'
                    size='giant'
                />

                <StreakIcon count={streak} />
            </Layout>
        </Layout>
    )
}

export default ProgressBar

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //flexWrap: 'wrap',

        borderBottomWidth: 5,

        marginTop: 10,

        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 10
        
    },
    container: {
        paddingHorizontal: 10,
        backgroundColor: theme['color-info-100']
    },

    progressBar: {
        width: 100,
        height: 100,
        marginHorizontal: 10
    },

    streak: {

    },

    count: {
        padding: 15,
        paddingVertical: 35,
        textAlign: 'center',
        backgroundColor: theme['color-info-200'],
        width: 110,
        height: 110,
        borderRadius: 62.5
    },

    notice: {
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 10
    }
});