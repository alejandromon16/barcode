import { GluestackUIProvider, Text, Box} from "@gluestack-ui/themed";
import React from "react";
import { config } from "../src/config/gluestack-ui.config";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import { View, StyleSheet } from 'react-native';

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  
  const [fontsLoaded] = useFonts({
    'GT Walsheim Pro-regular': require('../src/assets/fonts/GTWalsheimPro-Regular.ttf'),
  });

  if(fontsLoaded){
    SplashScreen.hideAsync();
  }


  return (
    <>
      <StatusBar style="auto" />
      <GluestackUIProvider config={config}>
        <Slot />
      </GluestackUIProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'GT Walsheim Pro-regular'
  },
});