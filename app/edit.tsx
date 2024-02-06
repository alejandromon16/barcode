import React, { useState } from "react";
import { z } from "zod";
import { Keyboard } from 'react-native';
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
import { router, useLocalSearchParams } from "expo-router";
import firebase from "@/config/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useAuthStore from "@/stores/auth.store";
import useUserStore from "@/stores/user.store";

interface FormData {
  fullName: string;
}

const schema = z.object({
  fullName: z.string(),
});

const edit = () => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const userStore = useUserStore();
  const params = useLocalSearchParams();
  const { userId } = useAuthStore();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleUpdateUserInfo = async (data: FormData) => {
    setButtonLoading(true);
    Keyboard.dismiss()
    try {
      const userRef = doc(firebase.db,'users',userId!);
      const res = await updateDoc(userRef, {
        fullName: data.fullName
      })

      userStore.updateUser = true;
      router.back();   
      setButtonLoading(false);
    } catch (e) {
      console.error(e);
      setButtonLoading(false);

    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try{
      await handleUpdateUserInfo(data as FormData);
    }catch(e){
      console.log(e)
    }
  };

  return (
    <Box>
      <VStack marginTop="$10" marginHorizontal="$10" >
        <Box h="auto" w="$full">
          <Controller
            control={control}
            name="fullName"
            defaultValue={params.fullName}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => {
              return (
                <>
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Nombre Completo</FormControlLabelText>
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
        <Box height='$10' />
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
      </VStack>
    </Box>
  );
};

export default edit;
