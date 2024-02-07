import React, { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from "expo-router";
import {
  Box,
  Button,
  ButtonText,
  ButtonSpinner,
  VStack,
  Text,
  FormControlLabel,
  FormControlLabelText,
} from "@gluestack-ui/themed";
import { useSpring, animated } from "@react-spring/native";
import { TextInput, StyleSheet, Easing, Keyboard } from "react-native";
import { collection, addDoc, Timestamp} from "firebase/firestore";
import firebase from "../../src/config/firebase/firebase";
import { z } from "zod";
import * as Crypto from 'expo-crypto';

interface FormData {
  amount: number;
}

const schema = z.object({
  amount: z.number().gt(0)
});

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
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [ticketAmount, setTicketAmount] = useState<number>(1);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const createTicket = async () => {
    setButtonLoading(true);
    try {
      const docRef = await addDoc(collection(firebase.db, "tickets"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setButtonLoading(false);
  };

  const addDataToFirestore = async () => {
    console.log('click')
    setButtonLoading(true);
    try {
      const docRef = await addDoc(collection(firebase.db, 'tickets'), {
        isAlreadyScan: false,
        createdAt: Timestamp.now(),
        qrString: Crypto.randomUUID()
      });
      
      setButtonLoading(false);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
      setButtonLoading(false);
    }
    setButtonLoading(false);
  };

  const [{ value }, setSpringTarget] = useSpring(() => ({
    value: 0,
    config: {
      duration: 300,
      easing: Easing.in
    },
  }));

  useEffect(() => {
    if (inputFocus) {
      setSpringTarget.start({ value: -285 });
    } else {
      setSpringTarget.start({ value: 0 });
    }

    if(buttonLoading){
      Keyboard.dismiss();
      setInputFocus(false);
    }
  }, [inputFocus, buttonLoading]);

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      height="$full"
    >
      <StackScreenConfig />

      <animated.View
        style={{
          flex: 1,
          transform: [{ translateY: value }],
        }}
      >
        <VStack display="flex" flex={1} rowGap="$24" marginHorizontal={"$10"}>
          <Box marginTop={"$1/3"} display="flex" justifyContent="center">
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
            <FormControlLabel mb="$1">
              <FormControlLabelText>Cantidad de tickets</FormControlLabelText>
            </FormControlLabel>
            <TextInput
              onFocus={() => { setInputFocus(true) }}
              style={styles.input}
              placeholder="1"
              keyboardType="numeric"
            />
          </Box>

          <Box>
            <Button
              onPress={() => {
                addDataToFirestore();
              }}
              width={"$full"}
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
            >
              {buttonLoading ? (
                <ButtonSpinner mr="$1" />
              ) : (
                <ButtonText color={"$black"}>
                  Generar
                </ButtonText>
              )}
            </Button>
          </Box>
        </VStack>
      </animated.View>
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default tickets;
