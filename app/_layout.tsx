import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TaskProvider } from '@/src/hooks';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

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
        <StatusBar style="auto" />
      </ThemeProvider>
    </TaskProvider>
  );
}
