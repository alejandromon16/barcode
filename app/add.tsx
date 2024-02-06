import React, { useState } from "react";
import { z } from "zod";
import { Keyboard } from "react-native";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  ButtonText,
  ButtonSpinner,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  VStack,
} from "@gluestack-ui/themed";
import { router, Stack, useGlobalSearchParams } from "expo-router";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import firebase from "@/config/firebase/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserDataI } from "@/services/fetchUserData";

interface StackScreenConfigProps {
  onPress: () => void;
}
const StackScreenConfig = ({ onPress }: StackScreenConfigProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleClick = () => {
    setIsEdit(!isEdit);
    onPress();
  };

  return (
    <Stack.Screen
      options={{
        headerShown: true,
        title: "Operarios",
        headerRight: () => (
          <Button onPress={handleClick} marginRight="$6" variant="link">
            <ButtonText>{isEdit ? "Cancelar" : "Editar"}</ButtonText>
          </Button>
        ),
      }}
    />
  );
};

interface FormData {
  fullName: string;
  phoneNumber: string;
  ci: string;
  email: string;
  password: string;
}

const schema = z.object({
  fullName: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  ci: z.string(),
  password: z.string(),
});

const edit = () => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const params = useGlobalSearchParams();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const createUserFirestore = async (data: UserDataI) => {
    try {
      const docRef = await setDoc(doc(firebase.db, "users", data.id), {
        createdAt: Timestamp.now(),
        isAdmin: false,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        isEmailVerified: data.isEmailVerified,
        ci: data.ci,
      });
    } catch (e) {
      console.log("Error :", e);
    }
  };

  const createEmployeeWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<string | null> => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );
      if (userCredentials) {
        const userId = userCredentials.user.uid;
        return userId;
      }
    } catch (e) {
      console.log("Error creando empleado: ", e);
    }
    return null;
  };

  const handleCreateEmployee = async (data: FormData) => {
    setButtonLoading(true);
    Keyboard.dismiss();
    try {
      const userId = await createEmployeeWithEmailAndPassword(
        data.email,
        data.password
      );
      if (userId) {
        const userDoc = await createUserFirestore({
          id: userId,
          ci: data.ci,
          fullName: data.fullName,
          email: data.email,
          isEmailVerified: false,
          isAdmin: false,
          phoneNumber: data.phoneNumber,
        });

        setButtonLoading(false);
        router.push("/employees");
      }
    } catch (e) {
      console.log("Error creando:", e);
      setButtonLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await handleCreateEmployee(data as FormData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <KeyboardAvoidingScrollView
      stickyFooter={
        <Box
          margin={'$5'}
        >
          <Button
            onPress={handleSubmit(onSubmit)}
            width={"$full"}
            size="md"
            variant="solid"
            action="primary"
            isDisabled={buttonLoading}
            isFocusVisible={false}
          >
            {buttonLoading ? (
              <ButtonSpinner mr="$1" />
            ) : (
              <ButtonText color={"$black"}>Crear</ButtonText>
            )}
          </Button>
        </Box>
      }
    >
      <Box>
        <VStack marginTop="$10" marginHorizontal="$10">
          <Box h="auto" w="$full">
            <Controller
              control={control}
              name="fullName"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>
                        Nombre Completo
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="underlined" display="flex">
                      <InputField
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Nombre y Apellido"
                      />
                    </Input>
                  </>
                );
              }}
            />
          </Box>
            
          <Box height='$5' />

          <Box h="auto" w="$full">
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
                        Numero de telefono
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="underlined" display="flex">
                      <InputField
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        placeholder="7438892"
                      />
                    </Input>
                  </>
                );
              }}
            />
          </Box>

          <Box height='$5' />

          <Box h="auto" w="$full">
            <Controller
              control={control}
              name="ci"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>
                        Carnet de Identidad
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="underlined" display="flex">
                      <InputField
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        placeholder="9923480"
                      />
                    </Input>
                  </>
                );
              }}
            />
          </Box>
          
          <Box height='$5' />

          <Box h="auto" w="$full">
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>Email</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="underlined" display="flex">
                      <InputField
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

          <Box height='$5' />

          <Box h="auto" w="$full">
            <Controller
              control={control}
              name="password"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>Contraseña</FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="underlined" display="flex">
                      <InputField
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        placeholder="at4hu2t34h"
                      />
                    </Input>
                  </>
                );
              }}
            />
          </Box>

          <Box></Box>
        </VStack>
      </Box>
    </KeyboardAvoidingScrollView>
  );
};

export default edit;
