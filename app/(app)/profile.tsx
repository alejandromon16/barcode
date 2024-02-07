import React, { useState, useEffect } from "react";
import { View } from "react-native";
import firebase from "../../src/config/firebase/firebase";
import {
  Image,
  Box,
  Input,
  InputField,
  FormControlLabel,
  FormControlLabelText,
  VStack,
  Button,
  ButtonText,
  useToast,
  Toast,
  ToastDescription,
} from "@gluestack-ui/themed";
import { router, Stack } from "expo-router";
import useAuthStore from "../../src/stores/auth.store";
import { getDoc, doc } from 'firebase/firestore';

const StackScreenConfig = () => {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        title: " Perfil",
        headerRight: () => (
          <Button 
            onPress={() => {
              router.push({
                pathname: '/edit',
                params: {
                  fullName: 'Alejandro Montero',
                  phoneNumber: '75002909'
                }
              })
            }}
            marginRight='$6' 
            variant="link"
          >
            <ButtonText>Editar</ButtonText>
          </Button>
        ),
      }}
    />
  );
};

interface UserDataI {
  email: string;
  isEmailVerified: boolean;
  phoneNumber: string;
  fullName: string;
}

const Profile = () => {
  const { userId } = useAuthStore();
  const toast = useToast();
  const [userData, setUserData] = useState<UserDataI | null>(null);


  const fetchUserData = async (documentId: string) => {
    try{
      const docRef = doc(firebase.db, 'users', documentId);
      const docSnapshot = await getDoc(docRef);

      console.log('user snap: ',docSnapshot.data());
    }catch(e){
      console.log('error fetching user: ', e);
    }
  }

  useEffect(() => {
    fetchUserData(userId);
  })
  // async function fetchUserData(userId: string) {
  //   const documentId = userId;
  //   try {
  //     const docRef = doc(firebase.db, 'users', documentId);
  //     const docSnapshot = await getDoc(docRef);
  
  //     if (!docSnapshot.exists()) {
  //       console.log('Document does not exist');
  //     }
  //     const data = docSnapshot.data();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //     throw error;
  //   }
  // }

  // useEffect(() => {
  //   fetchUserData(authStore.userId);
  // }, [authStore.userId]);

  const logoutClick = async () => {
    console.log("logging out");
    toast.show({
      placement: "bottom",
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} action="success" variant="accent">
            <VStack space="xs">
              <ToastDescription>
                Sesión cerrada correctamente.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });

    try {
      await authStore.logout();
      router.replace('/login');
    } catch (e) {
      console.log('Error logout: ', e);
    }
  };

  return (
    <View>
      <StackScreenConfig />

      {userData && (
        <VStack rowGap="$20" marginHorizontal={"$10"} marginVertical={"$8"}>
          <Box
            marginTop="$3"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              size="xl"
              resizeMode="contain"
              source={{
                uri: "https://assets.stickpng.com/images/585e4beacb11b227491c3399.png",
              }}
              alt="hero"
            />
          </Box>

          <VStack rowGap="$1/3">
            <Box>
              <FormControlLabel>
                <FormControlLabelText>Nombre Completo</FormControlLabelText>
              </FormControlLabel>
              <Input
                variant="underlined"
                size="md"
                isDisabled={true}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  placeholder="Enter Text here"
                  defaultValue={userData.fullName}
                />
              </Input>
            </Box>

            <Box>
              <FormControlLabel display="flex" justifyContent="space-between">
                <FormControlLabelText>Email</FormControlLabelText>

                {!userData.isEmailVerified && (
                  <Button variant="link">
                    <ButtonText>verificar</ButtonText>
                  </Button>
                )}
              </FormControlLabel>
              <Input
                variant="underlined"
                size="md"
                isDisabled={true}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  placeholder="Enter Text here"
                  defaultValue={userData.email}
                />
              </Input>
            </Box>

            <Box marginTop="$10">
              <Button
                onPress={logoutClick}
                bgColor={"$coolGray200"}
              >
                <ButtonText color="$coolGray700">Cerrar sesion</ButtonText>
              </Button>
            </Box>
          </VStack>
        </VStack>
      )}
    </View>
  );
};

export default Profile;
