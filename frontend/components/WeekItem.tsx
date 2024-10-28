import { Avatar, Button, Icon, Layout, ListItem, Text } from '@ui-kitten/components'
import React, { useRef } from 'react'
import { ImageProps, StyleSheet } from 'react-native'
import { default as theme } from '../app/theme.json'; // <-- Import app theme

//import Icon from '../assets/images/icon.png'

interface weekInterface {
    weekStart: Date;
    score: string;
    goal: string;
    onGoing: boolean;
}

const WeekItem = ({ item, index }: {item: weekInterface, index: number}) => {

    const weekStart = item.weekStart
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 7)

    let icon = item.score == item.goal ? 'checkmark-circle-2-outline' : 'close-circle-outline'
    item.onGoing && (icon = 'clock-outline')

    let color = item.score == item.goal ? theme['color-success-400'] : theme['color-danger-400']
    item.onGoing && (color = theme['color-info-200'])


    const CheckBtn = (props: any): React.ReactElement => {
        return <Button style={{...styles.icon, backgroundColor: color}} /*onPress={() => checkRef.current?.startAnimation()}*/ 
        accessoryRight={<Icon name={icon} {...props} /*ref={checkRef}*/ animation={'pulse'} />}/>
      }
    
    const ItemScore = (props: any): React.ReactElement => (
        <Layout style={styles.score}>
            <Text>
                {item.score}    
            </Text>
        </Layout>
    );

    const dateToString = (inDate: Date) => {
        const date = new Date(inDate)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }

    return (
        <ListItem
            accessoryLeft={ItemScore}
            accessoryRight={CheckBtn}
            title={`${dateToString(weekStart)}-${dateToString(weekEnd)}`}
        ></ListItem>
    )
}

const styles = StyleSheet.create({
    itemImage: {
        tintColor: theme['color-info-100'],
    },
    icon: {
        borderWidth: 0,
        borderRadius: 100
    },
    date: {
        textAlign: 'center',
    },
    score: {
        textAlign: 'center',
        color: theme['color-primary-100'],
        backgroundColor: theme['color-primary-300'],
        padding: 10,
        borderRadius: 100,
        marginRight: 20
    }
});

export default WeekItem