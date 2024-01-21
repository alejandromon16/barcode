import React from 'react'
import { Stack } from 'expo-router';
import { Box, Button, ButtonText, VStack, Text } from '@gluestack-ui/themed';

const StackScreenConfig = () => {
    return (
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Tickets",
        }}
      />
    );
};

const tickets = () => {
  return (
    <Box
    display="flex"
    justifyContent="flex-start"
    alignItems="center"
    height="$full"
  >
    <StackScreenConfig />

    <VStack
      display="flex"
      flex={1}
      rowGap='$24'
      marginHorizontal={"$10"}
    >
      <Box
        marginTop={"$1/3"}
        display="flex"
        justifyContent="center"
      >
        <VStack rowGap={"$1/3"}>
          <Box>
            <Text fontWeight={"$bold"} color="$black" fontSize={"$2xl"}>
              Antes de Generar...
            </Text>
          </Box>

          <Box>
            <Text>
              los tickets de terminal de uso son solo validos una vez, si se
              vuelve a escanear mostrara una notification de invalido y el
              mensaje de que ya ha sido usado.
            </Text>
          </Box>
        </VStack>
      </Box>

      <Box>
        <Button
          onPress={() => {}}
          width={"$full"}
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
        >
          <ButtonText color={"$black"}>Continuar</ButtonText>
        </Button>
      </Box>
    </VStack>
  </Box>
  )
}

export default tickets