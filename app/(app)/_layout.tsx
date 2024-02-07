import { Redirect, router, Slot, Stack, useNavigation } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { useEffect, useState } from "react";
import { animated, useSpring, easings } from "@react-spring/native";
import { useAuth } from "../../src/contexts/auth-context";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Button, ButtonText, ButtonIcon } from "@gluestack-ui/themed";
import React, { ReactNode } from "react";
import { TabButton, TabsType } from "../../src/components/TabButton";
import { FontAwesome6 } from '@expo/vector-icons';
import useAuthStore from "../../src/stores/auth.store";

interface TabButtonProps {
  onPress: () => void;
  icon: ReactNode;
  focused: boolean;
  tabName: TabsType;
  label: string;
}

interface renderTabButtonI {
  isAdmin: boolean;
}

export default function AppLayout() {
  const isAdmin = false;
  const [activeTab, setActiveTab] = useState<TabsType>("INDEX");
  const authStore = useAuthStore();

  if(!authStore.isAuth){
    return <Redirect href='/login' />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarLabel: " ",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          height: 90,
          width: "auto",
        },
      }}
    >
      <Tabs.Screen
        key="index"
        name="index"
        options={{
          tabBarButton: () => {
            if (!isAdmin) {
              return (
                <TabButton
                  label="Escaner"
                  focused={activeTab === "INDEX"}
                  tabName="INDEX"
                  icon={
                    <MaterialCommunityIcons
                      name="qrcode-scan"
                      size={22}
                      color={activeTab === "INDEX" ? "black" : "gray"}
                    />
                  }
                  onPress={() => {
                    setActiveTab("INDEX");
                    router.push("/");
                  }}
                />
              );
            } else {
              return (
                <TabButton
                  label="Datos"
                  focused={activeTab === "INDEX"}
                  tabName="INDEX"
                  icon={
                    <MaterialCommunityIcons
                      name="monitor-eye"
                      size={22}
                      color={activeTab === "INDEX" ? "black" : "gray"}
                    />
                  }
                  onPress={() => {
                    setActiveTab("INDEX");
                    router.push("/");
                  }}
                />
              );
            }
          },
        }}
      />

      <Tabs.Screen
        key="tickets"
        name="tickets"
        options={{
          tabBarButton: () => {
            if (!isAdmin) {
              return (
                <TabButton
                  label="Escaner"
                  focused={activeTab === "TICKETS"}
                  tabName="TICKETS"
                  icon={
                    <FontAwesome5
                      name="user"
                      size={22}
                      color={activeTab === "TICKETS" ? "black" : "gray"}
                    />
                  }
                  onPress={() => {
                    setActiveTab("TICKETS");
                    router.push("/tickets");
                  }}
                />
              );
            } else {
              return null;
            }
          },
        }}
      />

      <Tabs.Screen
        key="employees"
        name="employees"
        options={{
          tabBarButton: () => {
            if (isAdmin) {
              return (
                <TabButton
                  label="Operarios"
                  focused={activeTab === "EMPLOYEES"}
                  tabName="EMPLOYEES"
                  icon={
                    <FontAwesome6 
                      name="people-group" 
                      size={24} 
                      color={activeTab === "EMPLOYEES" ? "black" : "gray"}
                    />
                  }
                  onPress={() => {
                    setActiveTab("EMPLOYEES");
                    router.push("/employees");
                  }}
                />
              );
            } else {
              return null;
            }
          },
        }}
      />

      {/* <Tabs.Screen
        key="scanning"
        name="scannig"
        options={{
          tabBarButton: () => {
            return null;
          },
        }}
      /> */}

      <Tabs.Screen
        key="profile"
        name="profile"
        options={{
          tabBarButton: () => (
            <TabButton
              label="Perfil"
              focused={activeTab === "PROFILE"}
              tabName="PROFILE"
              icon={
                <FontAwesome5
                  name="user"
                  size={22}
                  color={activeTab === "PROFILE" ? "black" : "gray"}
                />
              }
              onPress={() => {
                setActiveTab("PROFILE");
                router.push("/profile");
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
