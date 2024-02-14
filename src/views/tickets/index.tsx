import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  useToast,
  Toast,
  ToastDescription,
  ToastTitle,
  HStack,
  Image
} from "@gluestack-ui/themed";
import { useSpring, animated } from "@react-spring/native";
import { TextInput, StyleSheet, Easing, Keyboard, View, TouchableWithoutFeedback } from "react-native";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import firebase from "@/config/firebase/firebase";
import { z } from "zod";
import * as Crypto from "expo-crypto";
import TicketView from "@/components/TicketView";
import { captureRef } from "react-native-view-shot";
import { uploadImageToFirebase } from "@/services/uploadImageToFirebase";
import { sendTicketToWhatsapp } from "@/services/sendTicketsToWhatsapp";
import { MotiView } from "moti";
import useAuthStore from "@/stores/auth.store";
import QRCode from "react-native-qrcode-svg";


interface InputStatesType {
  amountTicketsInputFocus: boolean;
  phoneNumberInputFocus: boolean;
}


interface FormData {
  amount: number;
  phoneNumber: string;
}

const schema = z.object({
  amount: z.number().gt(0, { message: "Ingresa una cantidad mayor a 0" }),
  phoneNumber: z.string(),
});



const tickets = () => {
  const { userId } = useAuthStore();
  const toast = useToast();
  const viewShotRef = useRef<View | null>(null);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [inputStates, setInputStates] = useState<InputStatesType>({
    amountTicketsInputFocus: false,
    phoneNumberInputFocus: false,
  });
  const [moveCard, setMoveCard] = useState<boolean>(false);
  const [qrValueString, setQrValue] = useState<string | null>(" ");

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const captureTicketView = async (): Promise<string | null> => {
    try {

      console.log('viewref', viewShotRef);
      const uri = await captureRef(viewShotRef, {
        format: "png",
        quality: 1,
        result: "tmpfile",
      });

      console.log('uri', uri)

      return uri;
    } catch (error) {
      console.error("Error capturing: ", error);
      return null;
    }
  };

  const createTicketInFirestore = async (qrValue: string) => {
    try {
      const docRef = await addDoc(collection(firebase.db, "tickets"), {
        isAlreadyScan: false,
        createdAt: Timestamp.now(),
        qrValue: qrValue,
        generatedBy: userId
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
      setButtonLoading(false);
    }
  };

  const createTicket = async (): Promise<string | null> => {
    const qrValue = Crypto.randomUUID();
    setQrValue(qrValue);

    if(qrValueString){
      const ticketImageUri = await captureTicketView();
      if (ticketImageUri) {
        const imageUrl = uploadImageToFirebase(ticketImageUri, qrValue);
        await createTicketInFirestore(qrValue);
  
        return imageUrl;
      }
    }

    return null;
  };

  const handleTickets = async (data: FormData) => {
    setButtonLoading(true);

    try {
      for (let i = 1; i <= data.amount; i++) {
        console.log("creating ticket ", i);
        const ticket = await createTicket();
        if (ticket) {
          await sendTicketToWhatsapp(ticket, data.phoneNumber);
        }
      }
    } catch (e) {
      console.log(e);
    }

    setButtonLoading(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try{
      await handleTickets(data as FormData);
      reset();
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="accent">
              <VStack space="xs">
                <ToastTitle>Creacion Exitosa</ToastTitle>
                <ToastDescription>Se Enviaron lo tickets</ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    }catch(e){
      console.log(e);
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="error" variant="accent">
              <VStack space="xs">
                <ToastTitle>No se Crearon los Tickets</ToastTitle>
                <ToastDescription>Hubo un error, intentalo de nuevo.</ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    }
  };
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',  
    };
  
    const formattedDate: string = new Intl.DateTimeFormat('es-ES', options).format(date);
    return formattedDate;
  }
  

  useEffect(() => {
    if (inputStates.amountTicketsInputFocus || inputStates.phoneNumberInputFocus) {
      setMoveCard(true);
    }

    if (!inputStates.amountTicketsInputFocus && !inputStates.phoneNumberInputFocus) {
      setMoveCard(false);
    }

    if (buttonLoading) {
      Keyboard.dismiss();
      setMoveCard(false);
    }
  }, [inputStates, buttonLoading]);

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      setMoveCard(false);
    }}>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        height="$full"
      >
        <TicketView refProp={viewShotRef} qrValue={qrValueString} />

        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: moveCard ? -130 : 0,
          }}
          transition={{
            type: "timing",
            duration: 350,
          }}
        >
          <VStack display="flex">
            <Box marginTop={"$1/3"} display="flex" justifyContent="center"></Box>

            <Box>
              <Controller
                control={control}
                name="amount"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <>
                      <FormControlLabel mb="$1">
                        <FormControlLabelText>
                          Cantidad de tickets
                        </FormControlLabelText>
                      </FormControlLabel>
                      <TextInput
                        onFocus={() => {
                          setInputStates((prev) => ({...prev, amountTicketsInputFocus: true}))
                        }}
                        onBlur={() => {
                          setInputStates((prev) => ({...prev, amountTicketsInputFocus: false}))
                        }}
                        style={styles.input}
                        placeholder="1"
                        keyboardType="numeric"
                        value={value !== undefined ? value.toString() : ""}
                        onChangeText={(text) => {
                          // Convert text to number and update the field
                          const numericValue = parseFloat(text);
                          onChange(isNaN(numericValue) ? "" : numericValue);
                        }}
                      />
                      {error && (
                        <Text style={{ color: "red" }}>{error.message}</Text>
                      )}
                    </>
                  );
                }}
              />
            </Box>

            <Box height='$5' />

            <Box>
              <Controller
                control={control}
                name="phoneNumber"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <>
                      <FormControlLabel mb="$1">
                        <FormControlLabelText>
                          Numero de Celular
                        </FormControlLabelText>
                      </FormControlLabel>
                      <TextInput
                        onFocus={() => {
                          setInputStates((prev) => ({...prev, phoneNumberInputFocus: true}))
                        }}
                        onBlur={() => {
                          setInputStates((prev) => ({...prev, phoneNumberInputFocus: false}))
                        }}
                        style={styles.input}
                        placeholder="75002893"
                        keyboardType="numeric"
                        value={value}
                        onChangeText={onChange}
                      />
                      {error && (
                        <Text style={{ color: "red" }}>{error.message}</Text>
                      )}
                    </>
                  );
                }}
              />
            </Box>
            
            <Box height='$5' />

            <Box>
              <Button
                onPress={handleSubmit(onSubmit)}
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
                  <ButtonText color={"$black"}>Generar</ButtonText>
                )}
              </Button>
            </Box>
          </VStack>
        </MotiView>
      </Box>
    </TouchableWithoutFeedback>
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