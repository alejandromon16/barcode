import { Redirect, router, Slot, Stack, useNavigation } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { useEffect, useState } from "react";
import { animated, useSpring, easings } from "@react-spring/native";
import { useAuth } from "../../src/contexts/auth-context";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Button, ButtonText, ButtonIcon } from "@gluestack-ui/themed";
import React, { ReactNode } from "react";

const StackScreenConfig = () => {
  return (
    <Stack.Screen
      options={{
        headerShown: false,
      }}
    />
  );
};

type TabsType = "INDEX" | "PROFILE" | "TICKETS";

interface TabButtonProps {
  onPress: () => void;
  icon: ReactNode;
  focused: boolean;
  tabName: TabsType;
  label: string;
}

const AnimatedButton = animated(Button);
const AnimatedButtonText = animated(ButtonText);

const TabButton: React.FC<TabButtonProps> = ({
  onPress,
  icon,
  focused,
  tabName,
  label,
}) => {
  const springProps = useSpring({
    backgroundColor: focused ? "#14CC60" : "#FFFFFF",
    color: focused ? "#FFFFFF" : "#808080",
    opacity: focused ? 1 : 0,
    config: {
      easing: easings.easeInOutQuart,
      duration: 200,
    },
  });

  return (
    <AnimatedButton
      onPress={onPress}
      style={{
        backgroundColor: springProps.backgroundColor,
        padding: 4,
        height: "auto",
        borderRadius: 20,
        display: "flex",
      }}
    >
      {icon}
      {focused && (
        <AnimatedButtonText
          marginLeft={"$2"}
          fontSize={"$sm"}
          color={focused ? "$black" : "$gray"}
          textTransform={"capitalize"}
          style={{
            opacity: springProps.opacity,
          }}
        >
          {label}
        </AnimatedButtonText>
      )}
    </AnimatedButton>
  );
};

export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<TabsType>("INDEX");

  const navigation = useNavigation();

  // if (!isAuthenticated) {
  //   return <Redirect href="/login" />;
  // }

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.replace("/login");
  //   }
  // }, [isAuthenticated]);

  return (
    <Tabs
      screenOptions={{
        tabBarLabel: " ",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          height: 90,
        },
      }}
    >
      <Tabs.Screen
        key="index"
        name="index"
        options={{
          tabBarIcon: () => (
            <TabButton
              label="Escaner"
              focused={activeTab === "INDEX"}
              tabName="INDEX"
              icon={
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={20}
                  color={activeTab === "INDEX" ? "black" : "gray"}
                />
              }
              onPress={() => {
                setActiveTab("INDEX");
                router.push("/");
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          tabBarIcon: () => (
            <TabButton
              label="Tickets"
              focused={activeTab === "TICKETS"}
              tabName="TICKETS"
              icon={
                <Fontisto
                  name="print"
                  size={20}
                  color={activeTab === "TICKETS" ? "black" : "gray"}
                />
              }
              onPress={() => {
                setActiveTab("TICKETS");
                navigation.navigate("tickets");
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => (
            <TabButton
              label="Perfil"
              focused={activeTab === "PROFILE"}
              tabName="PROFILE"
              icon={
                <FontAwesome5
                  name="user"
                  size={20}
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
