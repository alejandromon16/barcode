import { animated, useSpring, easings } from "@react-spring/native";
import { Button, ButtonText, Box } from "@gluestack-ui/themed";
import React, { ReactNode } from "react";


export type TabsType = "INDEX" | "PROFILE" | "TICKETS" | "EMPLOYEES";

interface TabButtonProps {
  onPress: () => void;
  icon: ReactNode;
  focused: boolean;
  tabName: TabsType;
  label: string;
  isDisable?: boolean;
  width?: '1/3' | '1/2'
}

const AnimatedButton = animated(Button);
const AnimatedButtonText = animated(ButtonText);

export const TabButton: React.FC<TabButtonProps> = ({
  onPress,
  icon,
  focused,
  tabName,
  label,
  isDisable,
  width = '1/3'
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
    <Box width={ `$${width}`}>
      <AnimatedButton
        onPress={onPress}
        style={{
          backgroundColor: springProps.backgroundColor,
          padding: 4,
          height: "auto",
          borderRadius: 20,
          margin: 5,
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
    </Box>
  );
};
