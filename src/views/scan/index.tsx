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
import { Stack, router } from "expo-router";
import { useAuth } from "../../contexts/auth-context";


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

      <VStack
        display="flex"
        flex={1}
        marginHorizontal={"$10"}
      >
        <Box
          marginTop={"$1/3"}
          display="flex"
          justifyContent="center"
        >
          <VStack>
            <Box>
              <Text paddingTop={'$2'} fontWeight={"$bold"} color="$black" fontSize={"$2xl"}>
                Antes de Escanear...
              </Text>
            </Box>
            
            <Box height='$5' />

            <Box>
              <Text>
                los tickets de terminal de uso son solo validos una vez, si se
                vuelve a escanear mostrara una notification de invalido y el
                mensaje de que ya ha sido usado.
              </Text>
            </Box>
          </VStack>
        </Box>

        <Box height='$5' />

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
