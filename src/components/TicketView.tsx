import React, { ForwardedRef } from "react";
import { View } from "react-native";
import { Box, VStack, HStack, Text, Image } from "@gluestack-ui/themed";
import QRCode from "react-native-qrcode-svg";

interface TicketViewProps {
  refProp: ForwardedRef<View>;
  qrValue: string | null;
}
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',  
  };

  const formattedDate: string = new Intl.DateTimeFormat('es-ES', options).format(date);
  return formattedDate;
}


const TicketView: React.FC<TicketViewProps> = ({ refProp, qrValue }) => {
  return (
    <View
      ref={refProp}
      style={{
        position: "absolute",
        width: "100%",
        top: -1000,
      }}
    >
          <Box backgroundColor="$black" width="$full">
            <Box
              backgroundColor="$white"
              borderRadius="$2xl"
              softShadow="2"
              marginHorizontal="$5"
              marginVertical="$10"
              padding="$7"
            >
              <VStack paddingBottom="$10">
                <HStack justifyContent="space-between">
                  <Text
                    fontFamily={"GT Walsheim-pro bold"}
                    fontWeight="$bold"
                    color="$black"
                  >
                    Uso de terminal
                  </Text>
                  <Text>{formatDate(new Date())}</Text>
                </HStack>
                <VStack justifyContent="center" alignItems="center">
                  <Image
                    size="2xxl"
                    resizeMode="contain"
                    source={require("../../src/assets/images/logoticket.png")}
                    alt="hero"
                  />
                  <QRCode size={200} value={qrValue!} />
                </VStack>
              </VStack>
            </Box>
          </Box>
    </View>
  );
};

export default TicketView;
