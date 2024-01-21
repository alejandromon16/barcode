import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';


const StackScreenConfig = () => {
    return (
      <Stack.Screen
        options={{
          headerShown: true,
          title: " Perfil",
        }}
      />
    );
};

const profile = () => {
  return (
    <View>
        <StackScreenConfig />
      <Text>profile</Text>
    </View>
  )
}

export default profile