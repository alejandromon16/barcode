import React, { useState, useEffect } from "react";
import { View, Alert, ScrollView, RefreshControl } from "react-native";
import {
  VStack,
  Button,
  ButtonText,
  useToast,
  Toast,
  ToastDescription,
} from "@gluestack-ui/themed";
import { router, Stack  } from "expo-router";
import useAuthStore from "@/stores/auth.store";
import { fetchUserData, UserDataI } from "@/services/fetchUserData";
import ProfileView from "@/views/profile/ProfileView";
import ProfileSkeletonView from "@/views/profile/ProfileSkeletonView";
import useUserStore from "@/stores/user.store";


interface StackScreenConfigProps {
  userData: UserDataI | null;
}
const StackScreenConfig = ({ 
  userData
}: StackScreenConfigProps) => (
  <Stack.Screen
    options={{
      headerShown: true,
      title: "Perfil",
      headerRight: () => {
        if (!userData) return null;

        return (
          <Button
            onPress={() => {
              router.push({
                pathname: "/edit",
                params: {
                  fullName: userData.fullName,
                  phoneNumber: userData.phoneNumber,
                },
              });
            }}
            marginRight="$6"
            variant="link"
          >
            <ButtonText>Editar</ButtonText>
          </Button>
        );
      },
    }}
  />
);

const Profile = () => {
  const userStore = useUserStore();
  const { userId, logout } = useAuthStore();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const toast = useToast();
  const [userData, setUserData] = useState<UserDataI | null>(null);

  const fetchData = async () => {
    try {
      if (userId) {
        const data = await fetchUserData(userId);

        if (data) {
          setUserData(data);
          setRefreshing(false);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  // useEffect(() => {
  //   console.log('updateUser ? : ', userStore.updateUser)
  //   if(userStore.updateUser){
  //     fetchData();

  //     userStore.updateUser= false;
  //   }
  // },[userStore.updateUser])

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };


  const handleLogout = async () => {
    console.log("Logging out");
    toast.show({
      placement: "bottom",
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} action="success" variant="accent">
            <VStack space="xs">
              <ToastDescription>Sesión cerrada correctamente.</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });

    try {
      await logout();
      router.replace("/login");
    } catch (e) {
      console.log("Error logout: ", e);
    }
  };

  const handleLogoutClick = () => {
    Alert.alert(
      "Confirmar cierre de sesión",
      "¿Está seguro de que desea cerrar sesión y salir de la aplicación?:",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: async () => await handleLogout() },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView
    refreshControl={
      <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
    }
    >
      <View>
        <StackScreenConfig userData={userData} />
        {userData ? (
          <ProfileView userData={userData} onLogoutClick={handleLogoutClick} />
        ) : (
          <ProfileSkeletonView colorMode="light" />
        )}
      </View>
    </ScrollView>
  );
};

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

export default Profile;
