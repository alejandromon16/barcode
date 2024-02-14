import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import {
  Button,
  ButtonText,
  View,
} from "@gluestack-ui/themed";
import { fetchEmployeesList } from "@/services/fetchEmployeesList";
import { UserDataI } from "@/services/fetchUserData";
import EmployeesView from "@/views/employees/EmployeesView";
import EmployeesSkeletonView from "@/views/employees/EmployeesSkeletonView";
import useAuthStore from "@/stores/auth.store";
import useUserStore from "@/stores/user.store";
import { ScrollView, RefreshControl } from "react-native";

const Employees = () => {
  const userStore = useUserStore();
  const [employeesData, setEmployeesData] = useState<UserDataI[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { userId } = useAuthStore();
  
  const fetchData = async () => {
    try {
      const data = await fetchEmployeesList();
      setEmployeesData(data);
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleEmployeeClick = (employee: UserDataI) => {
    console.log('employeeeee', employee);
    router.push({
      pathname: '/employee',
      params: {
        fullName: employee.fullName,
        phoneNumber: employee.phoneNumber,
        ci: employee.ci,
        id: employee.id
      }
    })
  }

  useEffect(() => {
    fetchData();
  }, [userId]);

  useEffect(() => {
    console.log('screen lista employees ', userStore.updateUser)
    if(userStore.updateUser){
      fetchData();
      userStore.updateUser
    }
  },[userStore.updateUser])

  return (
    <ScrollView
      style={{
        paddingBottom: 550
      }}
      refreshControl={
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
      }
    >
      <View backgroundColor={"$white"}>

        {employeesData ? (
          <EmployeesView employees={employeesData} onPress={handleEmployeeClick} />
        ) : (
          <EmployeesSkeletonView colorMode="light" />
        )}
      </View>
    </ScrollView>
  );
};

export default Employees;