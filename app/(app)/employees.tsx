import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';


const StackcreenConfig = () => {
    return (
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Operarios",
        }}
      />
    );
  };

const employees = () => {
  return (
    <View>
        <StackcreenConfig />
      <Text>employees</Text>
    </View>
  )
}

export default employees