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
import { Platform } from "react-native";

interface ProfileViewProps {
  userData: UserDataI;
  onLogoutClick: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ userData, onLogoutClick }) => (
  <VStack marginHorizontal="$10" marginVertical="$8">
    <Box
      marginTop="$3"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        size={Platform.OS === 'android' ? "lg": "xl"}
        resizeMode="contain"
        source={{
          uri: "https://assets.stickpng.com/images/585e4beacb11b227491c3399.png",
        }}
        alt="hero"
      />
    </Box>

    <Box height='$20' />

    <VStack>
      <Box>
        <FormControlLabel>
          <FormControlLabelText>Nombre Completo</FormControlLabelText>
        </FormControlLabel>
        <Input
          variant="underlined"
          size="md"
          isDisabled={true}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            placeholder="Nombre y Apellido"
            defaultValue={userData.fullName}
          />
        </Input>
      </Box>
      <Box height='$5' />
      <Box>
        <FormControlLabel display="flex" justifyContent="space-between">
          <FormControlLabelText>Email</FormControlLabelText>

          {/* {!userData.isEmailVerified && (
            <Button variant="link">
              <ButtonText>verificar</ButtonText>
            </Button>
          )} */}
        </FormControlLabel>
        <Input
          variant="underlined"
          size="md"
          isDisabled={true}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            placeholder="Enter Text here"
            defaultValue={userData.email}
          />
        </Input>
      </Box>

      <Box marginTop="$10">
        <Button onPress={onLogoutClick} bgColor="$coolGray200">
          <ButtonText color="$coolGray700">Cerrar sesión</ButtonText>
        </Button>
      </Box>
    </VStack>
  </VStack>
);

export default ProfileView;
