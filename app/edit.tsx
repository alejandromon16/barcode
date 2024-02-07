import { View } from "react-native";
import React, { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
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
import { router, useLocalSearchParams } from "expo-router";
import firebase from "../src/config/firebase/firebase";
import { updateProfile, updatePhoneNumber } from "firebase/auth";

interface FormData {
  fullName: string;
}

const schema = z.object({
  fullName: z.string().min(6),
});

const edit = () => {
  const params = useLocalSearchParams();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await updateProfile(firebase.auth.currentUser, {
        displayName: data.fullName,
      });

      console.log(res);
    } catch (e) {
      console.error(e);
    }
    setButtonLoading(false);
    router.push('/profile');
  };

  return (
    <View>
      <VStack marginTop="$10" marginHorizontal="$10" rowGap="$1/2">
        <Box h="auto" w="$full">
          <Controller
            control={control}
            name="fullName"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <>
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Nombre Completo</FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="underlined" display="flex">
                    <InputField
                      onFocus={
                        () => {}
                        //   setInputStates((prevS) => ({
                        //     ...prevS,
                        //     passwordInputFocus: true,
                        //   }))
                      }
                      onBlur={
                        () => {}
                        //   setInputStates((prevS) => ({
                        //     ...prevS,
                        //     passwordInputFocus: false,
                        //   }))
                      }
                      type="text"
                      value={value}
                      onChangeText={onChange}
                      defaultValue={params.fullName as string}
                      placeholder="Nombre y Apellido"
                    />
                  </Input>
                </>
              );
            }}
          />
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
            {buttonLoading ? (
              <ButtonSpinner mr="$1" />
            ) : (
              <ButtonText color={"$black"}>Guardar</ButtonText>
            )}
          </Button>
        </Box>
      </VStack>
    </View>
  );
};

export default edit;
