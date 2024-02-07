import { GluestackUIProvider } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { config } from "../src/config/gluestack-ui/gluestack-ui.config";
import { router, Slot, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import { LogBox, StyleSheet } from 'react-native';
import { AuthProvider } from "../src/contexts/auth-context";
import useAuthStore from "../src/stores/auth.store";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs();

export default function RootLayout() {
  const [isFontsLoaded] = useFonts({
    'GT Walsheim Pro-regular': require('../src/assets/fonts/GTWalsheimPro-Regular.ttf'),
  });
  const isAuth = useAuthStore((state) => state.isAuth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      if (isFontsLoaded) {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    loadFonts();
  }, [isFontsLoaded]);

  
  if (!isReady) {
    return null; 
  }
  
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <GluestackUIProvider config={config}>
        <Stack 
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="edit"
            options={{
              headerShown: true,
              headerTitle: 'Actualizar Datos',
              presentation: 'modal'
            }}
          />
        </Stack>
      </GluestackUIProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'GT Walsheim Pro-regular'
  },
});
