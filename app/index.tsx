import React, { useEffect, useState } from "react";
import { Platform } from 'react-native';
import { useSpring, animated } from '@react-spring/native';
import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  Box,
  Button,
  ButtonText,
  ButtonIcon,
  ButtonSpinner,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Image,
  Input,
  InputField,
  KeyboardAvoidingView,
  Text,
  VStack,
} from "@gluestack-ui/themed";


interface InputStatesType {
  emailInputFocus: boolean;
  passwordInputFocus: boolean;
}

export default function index() {
  const [moveInputCard, setMoveInputCard] = useState<boolean>(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if(inputStates.emailInputFocus || inputStates.passwordInputFocus ){
      setMoveInputCard(true)
      setSpringTarget.start({ value: -280});
    }

    if(!inputStates.emailInputFocus && !inputStates.passwordInputFocus ){
      setMoveInputCard(false);
      setSpringTarget.start({ value: 0});
    }
  },[inputStates])

  return (
        <Box height={"$full"} bgColor={"$green700"}>
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
                  rowGap="$20"
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
                      <FormControl
                          size="md"
                          isDisabled={false}
                          isInvalid={false}
                          isReadOnly={false}
                          isRequired={false}
                        >
                          <FormControlLabel mb="$1">
                            <FormControlLabelText>Email</FormControlLabelText>
                          </FormControlLabel>
                          <Input variant='underlined'>
                            <InputField 
                              onFocus={() => setInputStates((prevS) => ({...prevS, emailInputFocus: true}))}
                              onBlur={() => setInputStates((prevS) => ({...prevS, emailInputFocus: false}))}
                              type="text" 
                              placeholder="ejemplo@gmail.com"
                            />
                          </Input>
                          <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} />
                            <FormControlErrorText>
                              At least 6 characters are required.
                            </FormControlErrorText>
                          </FormControlError>
                        </FormControl>
                    </Box>
                    
                    <Box 
                      h="auto" 
                      w="$full"
                    >
                      <FormControl size="md" isDisabled={false} isInvalid={false} isReadOnly={false} isRequired={false}>
                        <FormControlLabel mb='$1'>
                          <FormControlLabelText>Contraseña</FormControlLabelText>
                        </FormControlLabel>
                        <Input
                          variant='underlined'
                          display="flex"
                        >
                          <InputField
                            onFocus={() => setInputStates((prevS) => ({...prevS, passwordInputFocus: true}))}
                            onBlur={() => setInputStates((prevS) => ({...prevS,passwordInputFocus: false}))}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="*************"
                          />
                          <Button 
                            variant='link'
                            onPress={() => togglePasswordVisibility()} 
                            size="sm"
                          >
                            <ButtonIcon size='xl' color={'$backgroundDark400'} as={showPassword ? EyeOffIcon : EyeIcon} />
                          </Button>
                        </Input>
                        <FormControlError>
                          <FormControlErrorIcon as={AlertCircleIcon} />
                          <FormControlErrorText>
                            At least 6 characters are required.
                          </FormControlErrorText>
                        </FormControlError>
                      </FormControl>
                    </Box>
                  </Box>

                  <Box display="flex">
                    <Button
                      width={"$full"}
                      size="md"
                      variant="solid"
                      action="primary"
                      isDisabled={true}
                      isFocusVisible={false}
                    >
                      <ButtonSpinner  mr="$1" />
                      {/* <ButtonText color={"$black"}>Iniciar Sesion</ButtonText> */}
                    </Button>
                  </Box>
                </VStack>
              </Box>
            </Box>
          </animated.View>
        </Box>
  );
}
