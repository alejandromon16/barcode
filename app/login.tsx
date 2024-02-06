import React, { useEffect, useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { Dimensions, Keyboard, Platform } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeIcon,
  EyeOffIcon,
  Box,
  Button,
  ButtonText,
  ButtonIcon,
  ButtonSpinner,
  FormControlLabel,
  FormControlLabelText,
  Image,
  Input,
  InputField,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { router, Stack } from "expo-router";
import useAuthStore from "@/stores/auth.store";
import { MotiView } from "moti";

interface InputStatesType {
  emailInputFocus: boolean;
  passwordInputFocus: boolean;
}

interface FormData {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const StackScreenConfig = () => {
  return (
    <Stack.Screen
      options={{
        headerShown: false,
      }}
    />
  );
};

export default function index() {
  const authStore = useAuthStore();
  const [moveCard, setMoveCard] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [inputStates, setInputStates] = useState<InputStatesType>({
    emailInputFocus: false,
    passwordInputFocus: false,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (inputStates.emailInputFocus || inputStates.passwordInputFocus) {
      setMoveCard(true);
    }

    if (!inputStates.emailInputFocus && !inputStates.passwordInputFocus) {
      setMoveCard(false);
    }

    if (buttonLoading) {
      Keyboard.dismiss();
      setMoveCard(false);
    }
  }, [inputStates, buttonLoading]);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleLogin = async (data: FormData) => {
    setButtonLoading(true);
    try {
      const res = await authStore.login(data.email, data.password);

      setButtonLoading(false);
      router.replace("/(app)");
    } catch (e) {
      setButtonLoading(false);
      console.error(e);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data as FormData);
  };

  const screenHeight = Dimensions.get('window').height;

  const twentyPercentOfScreenHeight = Platform.OS === 'android' ? screenHeight * 0.3 * -1: screenHeight * 0.2 * -1 ;

  return (
    <Box
      flex={1}
      bgColor="$white"
    >
        <Box height={"$1/2"} bgColor={"$green700"}>
          <StackScreenConfig />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              size="2xl"
              resizeMode="contain"
              source={require("@/assets/images/hero.png")}
              alt="hero"
            />
          </Box>

          <MotiView
            from={{
              translateY: 0,
            }}
            animate={{
              translateY: moveCard ? twentyPercentOfScreenHeight : 0,
            }}
            transition={{
              type: "timing",
              duration: 350,
            }}
          >
            <Box
              display="flex"
              position="relative"
              bottom={"$0"}
              borderTopLeftRadius={"$3xl"}
              borderTopRightRadius={"$3xl"}
              width={"$full"}
              bgColor={"$white"}
              height={"$full"}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <VStack
                  sx={{
                    '@base':{
                      paddingTop: '$10'
                    }
                  }}
                  width={"$full"}
                  paddingHorizontal="$10"
                  display="flex"
                >
                  <Box>
                    <Text
                      paddingVertical={"$1"}
                      color="$black"
                      fontWeight="$bold"
                    >
                      Inicia Sesion con tu Cuenta
                    </Text>
                  </Box>
                  
                  <Box height='$5' />

                  <Box>
                    <Box h="auto" w="$full">
                      <Controller
                        control={control}
                        name="email"
                        render={({
                          field: { onChange, onBlur, value },
                          fieldState: { error },
                        }) => {
                          return (
                            <>
                              <FormControlLabel mb="$1">
                                <FormControlLabelText
                                >Email</FormControlLabelText>
                              </FormControlLabel>
                              <Input variant="underlined" display="flex">
                                <InputField
                                  onFocus={() =>
                                    setInputStates((prevS) => ({
                                      ...prevS,
                                      passwordInputFocus: true,
                                    }))
                                  }
                                  onBlur={() =>
                                    setInputStates((prevS) => ({
                                      ...prevS,
                                      passwordInputFocus: false,
                                    }))
                                  }
                                  type="text"
                                  value={value}
                                  onChangeText={onChange}
                                  placeholder="ejemplo@gmail.com"
                                />
                              </Input>
                            </>
                          );
                        }}
                      />
                    </Box>

                    <Box height='$10' />


                    <Box h="auto" w="$full">
                      <Controller
                        name="password"
                        control={control}
                        render={({
                          field: { onChange, onBlur, value },
                          fieldState: { error },
                        }) => (
                          <>
                            <FormControlLabel mb="$1">
                              <FormControlLabelText
                              >
                                Contraseña
                              </FormControlLabelText>
                            </FormControlLabel>
                            <Input variant="underlined" display="flex">
                              <InputField
                                value={value}
                                onChangeText={onChange}
                                onFocus={() =>
                                  setInputStates((prevS) => ({
                                    ...prevS,
                                    passwordInputFocus: true,
                                  }))
                                }
                                onBlur={() =>
                                  setInputStates((prevS) => ({
                                    ...prevS,
                                    passwordInputFocus: false,
                                  }))
                                }
                                type={showPassword ? "text" : "password"}
                                placeholder="*************"
                              />
                              <Button
                                variant="link"
                                onPress={() => togglePasswordVisibility()}
                                size="sm"
                              >
                                <ButtonIcon
                                  size="xl"
                                  color="$backgroundDark400"
                                  as={showPassword ? EyeOffIcon : EyeIcon}
                                />
                              </Button>
                            </Input>
                          </>
                        )}
                      />
                    </Box>
                  </Box>

                  <Box height='$5' />

                  <Box display="flex">
                    <Button
                      onPress={handleSubmit(onSubmit)}
                      width={"$full"}
                      size="md"
                      variant="solid"
                      action="primary"
                      isDisabled={buttonLoading ? true : false}
                      isFocusVisible={false}
                    >
                      {buttonLoading ? (
                        <ButtonSpinner mr="$1" />
                      ) : (
                        <ButtonText
                          color={"$black"}>Iniciar Sesion</ButtonText>
                      )}
                    </Button>
                  </Box>
                </VStack>
              </Box>
            </Box>
          </MotiView>
        </Box>
    </Box>
  );
}
