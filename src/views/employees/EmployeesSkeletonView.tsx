import React from "react";
import { Box, HStack } from "@gluestack-ui/themed";
import { Skeleton } from "moti/skeleton";

interface EmployeesSkeletonViewProps {
  colorMode: "light" | "dark";
}

const EmployeesSkeletonView = ({
  colorMode = "light",
}: EmployeesSkeletonViewProps) => {
  return (
    <>
      <Box>
        <HStack
          borderBottomWidth="$1"
          paddingHorizontal="$5"
          paddingVertical="$10"
          borderBottomColor="$coolGray300"
        >
          <Skeleton colorMode={colorMode} width={"50%"} />
        </HStack>
      </Box>

      <Box height="$5" />

      <Box>
        <HStack
          borderBottomWidth="$1"
          paddingHorizontal="$5"
          paddingVertical="$10"
          borderBottomColor="$coolGray300"
        >
          <Skeleton colorMode={colorMode} width={"50%"} />
        </HStack>
      </Box>
      <Box height="$5" />
      <Box>
        <HStack
          borderBottomWidth="$1"
          paddingHorizontal="$5"
          paddingVertical="$10"
          borderBottomColor="$coolGray300"
        >
          <Skeleton colorMode={colorMode} width={"50%"} />
        </HStack>
      </Box>
      <Box height="$5" />
      <Box>
        <HStack
          borderBottomWidth="$1"
          paddingHorizontal="$5"
          paddingVertical="$10"
          borderBottomColor="$coolGray300"
        >
          <Skeleton colorMode={colorMode} width={"50%"} />
        </HStack>
      </Box>
      <Box height="$5" />

      <Box>
        <HStack
          borderBottomWidth="$1"
          paddingHorizontal="$5"
          paddingVertical="$10"
          borderBottomColor="$coolGray300"
        >
          <Skeleton colorMode={colorMode} width={"50%"} />
        </HStack>
      </Box>
    </>
  );
};

export default EmployeesSkeletonView;
