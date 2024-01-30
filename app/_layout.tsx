import { GluestackUIProvider } from "@gluestack-ui/themed";
import React from "react";
import { config } from "../src/config/gluestack-ui/gluestack-ui.config";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';
import { AuthProvider } from "../src/contexts/auth-context";

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  
  const [fontsLoaded] = useFonts({
    'GT Walsheim Pro-regular': require('../src/assets/fonts/GTWalsheimPro-Regular.ttf'),
  });

  if(fontsLoaded){
    SplashScreen.hideAsync();
  }


  return (
    <AuthProvider>
          <StatusBar style="auto" />
          <GluestackUIProvider config={config}>
            <Stack 
              initialRouteName="(app)"
              screenOptions={{
                headerShown: true,
              }}
            />
          </GluestackUIProvider>
      </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'GT Walsheim Pro-regular'
  },
});