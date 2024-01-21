import React, { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { useSpring, animated } from '@react-spring/native';
import { Keyboard } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../src/config/firebase/firebase";
import { useAuth } from "../src/contexts/auth-context";


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
  const { login } = useAuth();
  const [inputStates, setInputStates] = useState<InputStatesType>({
    emailInputFocus: false,
    passwordInputFocus: false,
  });

  const [{value}, setSpringTarget] = useSpring(() => ({
    value: 0,
    config: {
      duration: 300,
    }
  }));

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if(inputStates.emailInputFocus || inputStates.passwordInputFocus ){
      setSpringTarget.start({ value: -280});
    }

    if(!inputStates.emailInputFocus && !inputStates.passwordInputFocus ){
      setSpringTarget.start({ value: 0});
    }

    if(buttonLoading){
      Keyboard.dismiss();
      setSpringTarget.start({ value: 0});
    }
  },[inputStates, buttonLoading])

  const { handleSubmit, control, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setButtonLoading(true);
    try {
      const res =  await signInWithEmailAndPassword(auth, data.email, data.password);
      if(res.user){
        login()
        router.push('/(app)')
      }
    } catch(e) {
      setButtonLoading(false);
      console.error(e);
    }
  };

  return (
        <Box height={"$full"} bgColor={"$green700"}>
          <StackScreenConfig />
          <Box
            marginTop={"$20"}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              size="2xl"
              resizeMode="contain"
              source={require("../assets/hero.png")}
              alt="hero"
            />
          </Box>


          <animated.View
            style={{
              transform: [
                {translateY: value}
              ]
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
              style={{transform: `translateY(${value}px)`}}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <VStack
                  paddingTop={"$20"}
                  rowGap="-$16"
                  width={"$full"}
                  paddingHorizontal="$10"
                >
                  <Box>
                    <Text paddingVertical={'$1'} fontWeight={"$bold"} color="$black" fontSize={"$2xl"}>
                      Inicia Sesion con tu Cuenta
                    </Text>
                  </Box>
                  
                  <Box
                    rowGap={'$5'}
                  >
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
                              <FormControlLabelText>Email</FormControlLabelText>
                            </FormControlLabel>
                            <Input variant="underlined" display="flex">
                               <InputField
                                onFocus={() => setInputStates((prevS) => ({...prevS, passwordInputFocus: true}))}
                                onBlur={() => setInputStates((prevS) => ({...prevS,passwordInputFocus: false}))}
                                type='text'
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
                                <FormControlLabelText>Contraseña</FormControlLabelText>
                              </FormControlLabel>
                              <Input variant="underlined" display="flex">
                                <InputField
                                  value={value}
                                  onChangeText={onChange}
                                  onFocus={() => setInputStates((prevS) => ({...prevS, passwordInputFocus: true}))}
                                  onBlur={() => setInputStates((prevS) => ({...prevS,passwordInputFocus: false}))}
                                  type={showPassword ? 'text' : 'password'}
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
                      { buttonLoading ? (
                        <ButtonSpinner  mr="$1" />
                      ) : (
                        <ButtonText color={"$black"}>Iniciar Sesion</ButtonText>
                      )}
                    </Button>
                  </Box>
                </VStack>
              </Box>
            </Box>
          </animated.View>
        </Box>
  );
}
