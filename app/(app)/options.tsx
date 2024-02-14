import React from "react";
import TicketScreen from "@/views/tickets";
import EmployeesScreen from "@/views/employees";
import { router, Stack } from "expo-router";
import useAuthStore from "@/stores/auth.store";
import { Button, ButtonText } from "@gluestack-ui/themed";

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

const StackEmployeesScreenConfig = () => {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        title: "Operarios",
        headerRight: () => (
          <Button
            onPress={() => {
              router.push({
                pathname: "/add",
                params: {
                  fullName: "Alejandro Montero",
                  phoneNumber: "75002909",
                },
              });
            }}
            marginRight="$6"
            variant="link"
          >
            <ButtonText>Agregar</ButtonText>
          </Button>
        ),
      }}
    />
  );
};

const options = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin)

  return isAdmin ? (
    <>
      <StackEmployeesScreenConfig />
      <EmployeesScreen />
    </>
  ) : (
    <>
      <StackScreenConfig />
      <TicketScreen />
    </>
  );
};

export default options;
