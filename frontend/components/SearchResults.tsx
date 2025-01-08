import { IndexPath, Layout, Menu, MenuGroup, MenuItem, Button, Icon } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { updateWeekScore } from '../redux/weekscores/WeekScoresSlice';

import { default as theme } from '../app/theme.json'; // <-- Import app theme
import { useAppDispatch } from '../redux/store';

const SearchResults = ({ results }: { results: string[] }) => {

    const [selectedIndex, setSelectedIndex] = useState<IndexPath>();

    const dispatch = useAppDispatch()

    if (!results) results = []

    if (!results.length) results.push('No matches')

    const select = () => {
        if (selectedIndex) {
            const name = results[selectedIndex?.row]
            console.log(name)
            dispatch(updateWeekScore({ name }))
        }
    }

    const ConfirmButton = (props: any) => {
        return <Button onPress={select} style={styles.confirmbtn}
            accessoryRight={<Icon style name='checkmark-outline' {...props} />}
            status='success'>
            Add
        </Button>
    }

    const items = results.map((i) =>
        <MenuItem title={i}
            accessoryRight={ConfirmButton}
        />)

    return (
        <Menu selectedIndex={selectedIndex}
            onSelect={(i) => setSelectedIndex(i)}>
            <MenuGroup title={'Results'} >
                {items}
            </MenuGroup>
        </Menu>
    )
}

export default SearchResults

const styles = StyleSheet.create({

    confirmbtn: {
        borderRadius: 50,

    }
})