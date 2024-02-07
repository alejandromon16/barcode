import React from "react";
import {
  Button,
  ButtonText,
  ActionsheetBackdrop,
  ActionsheetItemText,
  ActionsheetItem,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Actionsheet,
  Box,
} from "@gluestack-ui/themed";
import { Octicons } from '@expo/vector-icons';

interface ActionSheetProps {
  showActionsheet: boolean;
  handleClose: () => void;
}

export const ActionSheet = ({
  handleClose,
  showActionsheet,
}: ActionSheetProps) => {
  return (
    <Box>
      <Button onPress={handleClose} bgColor={"$coolGray200"}>
        <ButtonText
          fontFamily='GT Walsheim Pro-regular' 
          fontSize='$sm'
          paddingRight='$2' 
          color="$coolGray700"
        >12 de Ene, 2024</ButtonText>
        <Octicons name="triangle-down" size={24} color="#00000053" />
      </Button>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Hoy</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Ultima Semana</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Ultimo Mes</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
};
