import React from "react";
import {
  VStack,
  Box,
  Image,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { UserDataI } from "@/services/fetchUserData";
import { Skeleton } from "moti/skeleton";

interface ProfileSkeletonViewProps {
  colorMode: "light" | "dark" | undefined;
}

const ProfileSkeletonView = ({
  colorMode = "light",
}: ProfileSkeletonViewProps) => (
  <VStack marginHorizontal="$10" marginVertical="$8">
    <Box
      marginTop="$3"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Skeleton colorMode={colorMode} radius="round" height={145} width={145} />
    </Box>
    <Box height="$10" />
    <VStack>
      <Box>
        <Skeleton colorMode={colorMode} width={"50%"} />
        <Box height="$4" />
        <Skeleton colorMode={colorMode} width={"100%"} />
      </Box>

      <Box>
        <Skeleton colorMode={colorMode} width={"50%"} />
        <Box height="$4" />
        <Skeleton colorMode={colorMode} width={"100%"} />
      </Box>

      <Box>
        <Skeleton colorMode={colorMode} width={'50%'} />
        <Box height='$4' />
        <Skeleton colorMode={colorMode} width={'100%'} />
      </Box>

      <Box marginTop="$10">
        <Skeleton colorMode={colorMode} width={"100%"} />
      </Box>
    </VStack>
  </VStack>
);

export default ProfileSkeletonView;
