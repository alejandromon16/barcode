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
import {
  router,
  Stack,
  useGlobalSearchParams,
} from "expo-router";
import firebase from "@/config/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface StackScreenConfigProps {
  onPress: () => void;
}
const StackScreenConfig = ({ onPress }: StackScreenConfigProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleClick = () => {
    setIsEdit(!isEdit);
    onPress();
  }

  return (
    <Stack.Screen
      options={{
        headerShown: true,
        title: "Operarios",
        headerRight: () => (
          <Button
            onPress={handleClick}
            marginRight="$6"
            variant="link"
          >
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
}

const schema = z.object({
  fullName: z.string(),
  phoneNumber: z.string(),
  ci: z.string(),
});

const edit = () => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [isViewMode, setViewMode] = useState<boolean>(true);
  const params = useGlobalSearchParams();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleUpdateUserInfo = async (data: FormData) => {
    setButtonLoading(true);
    Keyboard.dismiss();
    try {
      const userRef = doc(firebase.db, "users", params["id"] as string);
      const res = await updateDoc(userRef, {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        ci: data.ci
      });

      router.back();
      setButtonLoading(false);
    } catch (e) {
      console.error(e);
      setButtonLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await handleUpdateUserInfo(data as FormData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <StackScreenConfig onPress={() => setViewMode(!isViewMode)} />
      <VStack marginTop="$10" marginHorizontal="$10">
        <Box h="auto" w="$full">
          <Controller
            control={control}
            name="fullName"
            defaultValue={params.fullName}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <>
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Nombre Completo</FormControlLabelText>
                  </FormControlLabel>
                  <Input
                    isDisabled={isViewMode}
                    variant="underlined"
                    display="flex"
                  >
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
            defaultValue={params.phoneNumber}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <>
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>
                      Numero de telefono
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input
                    isDisabled={isViewMode}
                    variant="underlined"
                    display="flex"
                  >
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
            name="ci"
            defaultValue={params.ci}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <>
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>
                      Carnet de Identidad
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input
                    isDisabled={isViewMode}
                    variant="underlined"
                    display="flex"
                  >
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


        {!isViewMode && (
          <Box>
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
                <ButtonText color={"$black"}>Generar</ButtonText>
              )}
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default edit;
