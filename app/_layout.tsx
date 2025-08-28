import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TaskProvider } from '@/src/hooks';
<<<<<<< HEAD

import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

=======
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> 27106e285e9b3c3756513cae153f0380a971b885

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

<<<<<<< HEAD
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  // Configura como as notificações se comportam quando o app está em foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

useEffect(() => {
  // Solicita permissão ao iniciar o app
  async function requestNotificationPermission() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para notificações foi negada.');
    }
  }

  requestNotificationPermission();
}, []);


  return (
    <TaskProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="task-details" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
=======
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const logged = await AsyncStorage.getItem('loggedIn');
      setIsLoggedIn(logged === 'true');
    })();
  }, []);

  if (!loaded || isLoggedIn === null) {
    // Aguarda fontes e estado de login
    return null;
  }

  return (
    <TaskProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
         <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            {isLoggedIn ? (
              <>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="task-details" />
              </>
            ) : (
              <Stack.Screen name="login" />
            )}
            <Stack.Screen name="+not-found" />
          </Stack>
>>>>>>> 27106e285e9b3c3756513cae153f0380a971b885
        <StatusBar style="auto" />
      </ThemeProvider>
    </TaskProvider>
  );
}
