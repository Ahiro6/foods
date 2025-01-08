import React, { useEffect, useRef, useState } from 'react'

import { View, StyleSheet, ButtonProps, TouchableHighlight, TouchableNativeFeedback } from 'react-native'

import { Button, Icon, IconElement, Input, InputProps, Layout, Text } from '@ui-kitten/components';

import { LinearGradient } from 'expo-linear-gradient';

import { default as theme } from '../app/theme.json'; // <-- Import app theme
import { RenderProp } from '@ui-kitten/components/devsupport';
import { ImageProps } from 'react-native-svg/lib/typescript/ReactNativeSVG';
import SearchResults from './SearchResults';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { getPlants } from '../redux/api/ApiSlice';


const SearchBar = () => {

  const [value, setValue] = useState('')
  const { plant } = useSelector((state: any) => state.api)

  useEffect(() => {

  }, [plant])

  const [animation, setAnimation] = useState('zoom')

  const searchRef = useRef<Icon<Partial<ImageProps>>>();

  const dispatch = useAppDispatch()

  const search = async () => {
    
    dispatch(getPlants({ plant: value }))

    animate(value)
  }

  const animate = (value: string) => {
    if (value === '') {
      setAnimation('shake')
      searchRef.current?.startAnimation()
      return
    }
    setAnimation('zoom')
    searchRef.current?.startAnimation()
  }

  const SearchBtn = (props: any): React.ReactElement => {
    return <Button style={styles.icon} onPress={search} onFocus={search}
      accessoryRight={<Icon style name='search-outline' {...props} ref={searchRef} animation={animation} />} />
  }

  return (
    <Layout style={styles.container}>
      <Input
        placeholder='Search a fruit'
        style={
          styles.input
        }
        status='danger'
        onChangeText={v => setValue(v)}

        accessoryRight={SearchBtn}
      />

      <Layout style={styles.results}>
        <SearchResults results={plant} />
      </Layout>

    </Layout>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderWidth: 2,
    backgroundColor: theme['color-danger-400'],
    borderRadius: 50
  },
  icon: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: theme['color-danger-500'],
    backgroundColor: theme['color-danger-400'],
  },
  results: {
    
  },

  container: {
    backgroundColor: theme['color-danger-300'],
    borderBottomColor: theme['color-danger-500'],
    borderBottomWidth: 4,
    marginBottom: 20,
  }
});