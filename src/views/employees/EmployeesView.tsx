import { UserDataI } from "@/services/fetchUserData";
import { ScrollView, Box, Text, HStack } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

interface EmployeesViewProps {
    employees: UserDataI[];
    onPress: (employee: UserDataI) => void;
  }
  
  const EmployeesView:  React.FC<EmployeesViewProps> = ({ employees, onPress }) => {
    return (
      <ScrollView
        style={{
          paddingBottom: 200
        }}
      >
        {employees.map((employee: UserDataI) => (
          <TouchableOpacity key={employee.email} onPress={() => onPress(employee)}>
            <Box>
              <HStack
                borderBottomWidth="$1"
                paddingHorizontal="$5"
                paddingVertical="$10"
                borderBottomColor="$coolGray300"
              >
                <Text>{employee.fullName}</Text>
              </HStack>
            </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

export default EmployeesView