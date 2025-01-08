import { Button, Icon, Layout, Popover, Text } from '@ui-kitten/components'
import React, { useRef, useState } from 'react'
import { ImageProps, StyleSheet } from 'react-native'

import { default as theme } from '../app/theme.json'; // <-- Import app theme

import StreakIcon from './StreakIcon'
import LogoutBtn from './LogoutBtn';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/user/UserSlice';
import { useAppDispatch } from '../redux/store';

const ProfileBar = ({ username, streak }: { username: string, streak: number }) => {

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
            <Layout style={{ ...styles.innerContainer, borderBottomColor: color }} onPointerEnter={toggleColor} onPointerLeave={toggleColor}>
                <Layout style={styles.userContainer}>
                    <StreakIcon count={streak} />

                    <Text style={styles.text} category='h6'>
                        {username}
                    </Text>

                </Layout>
                <LogoutBtn/>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //flexWrap: 'wrap',

        borderBottomWidth: 5,

        marginTop: 10,

        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,

        height: 120

    },
    container: {
        paddingHorizontal: 10,
        backgroundColor: theme['color-info-100']
    },

    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '20%',
    },

    text: {
        textAlign: 'center',
        fontSize: 25,
        marginLeft: 30
        //flexGrow: 1
    },
    icon: {
        borderWidth: 0
    },

});

export default ProfileBar