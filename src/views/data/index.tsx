import React, { useState } from "react";
import { Box, ScrollView, VStack, Text, HStack } from "@gluestack-ui/themed";
import { LineGraph } from "../../components/LineGraph";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { ActionSheet } from "../../components/ActionSheet";
import { Octicons } from '@expo/vector-icons';

type dataDate = 'TODAY' | 'LAST_WEEK' | 'LAST_MONTH';

const index = () => {
  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const handleClose = () => setShowActionsheet(!showActionsheet)
  const originalAmountOfSales = "2300 Bs";
  const [amountOfSales, setAmountOfSales] = useState("2300 Bs");
  const [parentDimensions, setParentDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setParentDimensions({ width, height });
  };

  const pointFocus = (dataPoint: any) => {
    console.log(dataPoint);
    setAmountOfSales(dataPoint.extraData?.formattedValue);
  };

  const pointUnfocus = () => {
    setAmountOfSales(originalAmountOfSales);
  };

  return (
    <ScrollView>
      <VStack paddingBottom='$40' marginHorizontal="$8">
        <Box
          marginTop='$10'
        >
          <Text
            fontSize="$3xl"
              fontWeight="$bold"
              fontFamily="GT-Walsheim Pro-bold"
              paddingTop='$2'
              color='$black'
          >
            Bienvenido Dr. Mario
          </Text>

          <Box
           marginTop='$5'
           width='$1/2'
          >

            <ActionSheet 
              showActionsheet={showActionsheet}
              handleClose={handleClose}
            />
          </Box>

        </Box>

        <VStack justifyContent="space-between">
          <Box
            onLayout={handleLayout}
            marginTop="$10"
            bgColor="$white"
            borderRadius="$2xl"
            softShadow="1"
            paddingVertical="$6"
            paddingHorizontal="$6"
            width="auto"
          >
            <Box display="flex" alignItems="flex-end">
              <MaterialIcons name="print" size={24} color="#78A55A" />
            </Box>
            <Text
              paddingTop="$5"
              fontSize="$3xl"
              fontWeight="$bold"
              fontFamily="GT-Walsheim Pro-bold"
              color='$black'

            >
              597
            </Text>
            <Text paddingVertical="$3" fontSize="$sm">
              Tickets Generados
            </Text>
          </Box>

          <Box
            onLayout={handleLayout}
            marginTop="$10"
            bgColor="$white"
            borderRadius="$2xl"
            softShadow="1"
            paddingVertical="$6"
            paddingHorizontal="$6"
            width="auto"
          >
            <Box display="flex" alignItems="flex-end">
              <Ionicons name="shield-checkmark" size={22} color="#78A55A" />
            </Box>
            <Text
              fontSize="$3xl"
              fontWeight="$bold"
              fontFamily="GT-Walsheim Pro-bold"
              paddingTop="$5"
              color='$black'

            >
              319
            </Text>
            <Text paddingVertical="$3" fontSize="$sm">
              Tickets Verificados
            </Text>
          </Box>
        </VStack>

        <Box
          onLayout={handleLayout}
          marginTop="$10"
          height="$96"
          width="$full"
          bgColor="$white"
          borderRadius="$2xl"
          softShadow="1"
        >
          <VStack paddingVertical="$5">
            <Box display="flex">
              <Text
                padding="$5"
                fontSize="$3xl"
                fontWeight="$bold"
                fontFamily="GT-Walsheim Pro-bold"
                color='$black'

              >
                {amountOfSales}
              </Text>
            </Box>
            <Text fontSize='$sm' paddingHorizontal="$6">Ingreso Total</Text>
          </VStack>
          {parentDimensions.width > 0 && (
            <LineGraph
              width={parentDimensions.width}
              pointFocus={(dataPoint) => pointFocus(dataPoint)}
              pointUnfocus={() => pointUnfocus()}
            />
          )}
        </Box>

        <Box
          marginTop="$10"
          height="$96"
          width="$full"
          bgColor="$white"
          borderRadius="$2xl"
          softShadow="1"
        >

        </Box>
      </VStack>
    </ScrollView>
  );
};

export default index;
