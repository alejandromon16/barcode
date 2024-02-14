import { Redirect, router } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { useState } from "react";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { TabButton, TabsType } from "@/components/TabButton";
import { FontAwesome6 } from "@expo/vector-icons";
import useAuthStore from "@/stores/auth.store";
import { Platform } from "react-native";

export default function AppLayout() {
  const isAdmin = useAuthStore((state) => state.isAdmin);

  const [activeTab, setActiveTab] = useState<TabsType>("INDEX");
  const authStore = useAuthStore();

  if (!authStore.isAuth) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarLabel: " ",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          height: Platform.OS === "android" ? 70 : 100,
          width: "auto",
        },
      }}
    >
      <Tabs.Screen
        name="options"
        options={{
          tabBarInactiveTintColor: "#C7C5C5",
          tabBarActiveTintColor: "#15BE5A",
          tabBarLabel: isAdmin ? "Operarios" : "Tickets",
          tabBarLabelStyle: {
            paddingBottom: 5,
          },
          tabBarIcon: (props) => {
            if (isAdmin) {
              return (
                <MaterialCommunityIcons
                  name="monitor-eye"
                  size={22}
                  color={props.focused ? "#15BE5A" : "gray"}
                />
              );
            } else {
              return (
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={20}
                  color={props.focused ? "#15BE5A" : "gray"}
                />
              );
            }
          },
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          tabBarInactiveTintColor: "#C7C5C5",
          tabBarActiveTintColor: "#15BE5A",
          tabBarLabel: isAdmin ? "Datos" : "Escaner",
          tabBarLabelStyle: {
            paddingBottom: 5,
          },
          tabBarIcon: (props) => {
            if (isAdmin) {
              return (
                <FontAwesome6
                name="people-group"
                size={20}
                color={props.focused ? "#15BE5A" : "gray"}
              />
              );
            } else {
              return (
                <Fontisto
                name="print"
                size={20}
                color={props.focused ? "#15BE5A" : "gray"}
              />
              );
            }
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarInactiveTintColor: "#C7C5C5",
          tabBarActiveTintColor: "#15BE5A",
          tabBarLabel: "Perfil",
          tabBarLabelStyle: {
            paddingBottom: 5,
          },
          tabBarIcon: (props) => {
            return (
              <FontAwesome5
                name="user"
                size={20}
                color={props.focused ? "#15BE5A" : "gray"}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
