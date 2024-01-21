import React from "react";
import {
  Box,
  Button,
  ButtonText,
  Toast,
  Text,
  ToastDescription,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import { useAuth } from "../../src/contexts/auth-context";
import { Stack, router } from "expo-router";

const StackScreenConfig = () => {
  return (
    <Stack.Screen
      options={{
        headerShown:true,
        title: " Escaner",
      }}
    />
  );
};

const index = () => {
  const { logout } = useAuth();
  const toast = useToast();
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
                Antes de Escanear...
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
            onPress={() => {
              router.push('/scanning')
            }}
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
  );
};

export default index;
