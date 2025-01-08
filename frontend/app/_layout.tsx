
import { Stack } from "expo-router";
import { Provider } from 'react-redux'

import { ApplicationProvider, Layout, Text, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva'

import { default as theme } from './theme.json'; // <-- Import app theme

import { store, useAppDispatch } from '../redux/store'
import { getUser } from "../redux/user/UserSlice";

export default function RootLayout() {

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ApplicationProvider>
    </Provider>
  );
}
