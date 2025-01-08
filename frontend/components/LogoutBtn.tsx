import { Button, Icon, Layout, Popover, Text } from '@ui-kitten/components'
import React, { useRef, useState } from 'react'
import { ButtonProps, ImageProps } from 'react-native';
import { StyleSheet } from 'react-native';

import { default as theme } from '../app/theme.json'; // <-- Import app theme
import { useAppDispatch } from '../redux/store';
import { logout } from '../redux/user/UserSlice';

const LogoutBtn = () => {

    const iconRef = useRef<Icon<Partial<ImageProps>>>();

    const [visible, setVisible] = useState(false);

    const dispatch = useAppDispatch()

    const onLogout = () => {
        animation()
        dispatch(logout({}))
    }

    const animation = () => {
        iconRef.current?.startAnimation()
    }

    const icon = (props: any): React.ReactElement => {
        return <Icon name='log-out-outline' {...props} animation={'zoom'} ref={iconRef} />
    }

    const toggleBtn = () => {
        
        setVisible(!visible)
        
    }

    const popoverBtn = (): React.ReactElement => {
        return <Button accessoryRight={icon} onPress={toggleBtn} />
    }

    return (
        <Layout>
            <Popover
                placement={'left'}
                backdropStyle={styles.backdrop}
                visible={visible}
                anchor={popoverBtn}
                onShow={animation}
                onBackdropPress={toggleBtn}>
                    <Layout style={styles.content}>
                        <Button accessoryRight={icon} onPress={onLogout} style={styles.contentBtn}>Logout?</Button>
                    </Layout>
            </Popover>
        </Layout>
    )
}

export default LogoutBtn

const styles = StyleSheet.create({
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 64,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 4,
      paddingVertical: 8,
    },
    contentBtn: {
        borderWidth: 0,
        backgroundColor: theme['color-warning-600'],
        color: 'black'
    },
    avatar: {
      marginHorizontal: 4,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
  });