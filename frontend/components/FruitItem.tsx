import { Avatar, Layout, ListItem } from '@ui-kitten/components'
import React from 'react'
import { ImageProps, StyleSheet } from 'react-native'
import { default as theme } from '../app/theme.json'; // <-- Import app theme

//import Icon from '../assets/images/icon.png'

interface fruitInterface {
    commonName: string;
    img: string;
}



const FruitItem = ({ item, index }: {item: fruitInterface, index: number}) => {

    //const img = fruit.img || '../assets/images/icon.png'

    const ItemImage = (props: any): React.ReactElement => (
        <Avatar
            {...props}
            source={require('../assets/images/partial-react-logo.png')}
        />
    );

    return (
        <ListItem
            accessoryLeft={ItemImage}
            title={item.commonName}
        ></ListItem>
    )
}

const styles = StyleSheet.create({
    itemImage: {
        tintColor: theme['color-info-100'],
    },
});

export default FruitItem