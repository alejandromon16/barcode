import React from "react";
import ScanScreen from "@/views/scan";
import DataScreen from "@/views/data";
import { Stack } from "expo-router";
import useAuthStore from "@/stores/auth.store";

const StackDataScreenConfig = () => {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        title: "Datos",
      }}
    />
  );
};

const StackScanScreenConfig = () => {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        title: "Escaner",
      }}
    />
  );
};

const index = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin)

  return isAdmin ? (
    <>
      <StackDataScreenConfig />
      <DataScreen />
    </>
  ) : (
    <>
      <StackScanScreenConfig />
      <ScanScreen />
    </>
  );
};

export default index;
