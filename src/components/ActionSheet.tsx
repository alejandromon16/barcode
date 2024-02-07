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
  ButtonIcon,
  SelectIcon
} from "@gluestack-ui/themed";
import { Octicons } from '@expo/vector-icons';
import { TimeRange } from "@/services/getTicketCounts";

interface ActionSheetProps {
  value: string;
  showActionsheet: boolean;
  handleClose: () => void;
  timeRangeSelected: (timeRange: TimeRange) => void;
}

export const ActionSheet = ({
  handleClose,
  timeRangeSelected,
  showActionsheet,
  value
}: ActionSheetProps) => {

  const handleSelect = (timeRange: TimeRange) => {
    timeRangeSelected(timeRange);
    handleClose();
  }

  return (
    <Box>
      <Button onPress={() => handleClose()} bgColor={"$coolGray200"}>
        <ButtonText
          fontFamily='GT Walsheim Pro-regular' 
          fontSize='$sm'
          color="$coolGray700"
        >{value}  </ButtonText>
        <Octicons name="triangle-down" size={24} color="#00000053" />
      </Button>
      <Actionsheet isOpen={showActionsheet} onClose={() => handleClose()} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={() => handleSelect('TODAY')}>
            <ActionsheetItemText>Hoy</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => handleSelect('LAST_WEEK')}>
            <ActionsheetItemText>Ultima Semana</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => handleSelect('LAST_MONTH')}>
            <ActionsheetItemText>Ultimo Mes</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
};
