import React, { useState, useEffect } from "react";
import { Box, ScrollView, VStack, Text, HStack } from "@gluestack-ui/themed";
import { LineGraph } from "../../components/LineGraph";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { ActionSheet } from "../../components/ActionSheet";
import { Octicons } from '@expo/vector-icons';
import { TimeRange, getTicketCounts } from "@/services/getTicketCounts";
import { Skeleton } from "moti/skeleton";
import { getSalesData } from "@/services/getSalesData";
import firebase from "@/config/firebase/firebase";
import { UserDataI, fetchUserData } from "@/services/fetchUserData";
import useAuthStore from "@/stores/auth.store";
import { TicketStats, getTicketStatsByUser } from "@/services/getTicketStatsByUser";
import TicketStatsTable from "@/components/TableStats";
import TicketScanStatsTable from "@/components/TableStatsScan";

type dataDate = 'TODAY' | 'LAST_WEEK' | 'LAST_MONTH';

const formatDate = (date) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
  return formattedDate;
};


const index = () => {
  const [timeRangeData, setTimeRangeData] = useState<TimeRange>('TODAY')
  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const [generadosCount, setGeneradosCount] = useState(null);
  const [verificadosCount, setVerificadosCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRangeString, setTimeRangeString] = useState(formatDate(new Date()))
  const [amountOfSales, setAmountOfSales] = useState<number | null>(null);
  const [salesData, setSalesData] = useState(null);
  const [generatedByStats, setGeneratedByStats] = useState<TicketStats[]>([]);
  const [scanByStats, setScanByStats] = useState<TicketStats[]>([]);
  const [parentDimensions, setParentDimensions] = useState({
    width: 0,
    widthTables: 0,
  });
  const handleClose = () => setShowActionsheet(!showActionsheet)
  const { userId } = useAuthStore();
  const [userData, setUserData] = useState<UserDataI | null>(null);

  const fetchData = async () => {
    try {
      if (userId) {
        const data = await fetchUserData(userId);
        console.log('dataa', data)
        if (data) {
          setUserData(data);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setParentDimensions((prev) => ({ ...prev, width: width, widthTables: prev.widthTables }));
  };

  const handleLayoutTables = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setParentDimensions((prev) => ({ ...prev, widthTables: width, width: prev.width }));
  }

  const pointFocus = (dataPoint: any) => {
    console.log(dataPoint);
    const amount = dataPoint.y * 3;
    setAmountOfSales(amount);
  };

  const pointUnfocus = () => {
    setAmountOfSales(generadosCount * 3);
  };

  const timeSelected = (timeRange: TimeRange) => {
    console.log('this is timerange: ', timeRange.toString());
    if (timeRangeData != timeRange) {
      setTimeRangeData(timeRange);

      switch (timeRange) {
        case "TODAY":
          setTimeRangeString(formatDate(new Date()));
          break;
        case "LAST_WEEK":
          setTimeRangeString('Ultima semana');
          break;
        case "LAST_MONTH":
          setTimeRangeString('Ultimo mes');
          break;
      }
    }
  }

  const fetchTicketCounts = async (timeRange: TimeRange | null) => {
    try {
      if (timeRange !== null) {
        const ticketCounts = await getTicketCounts(timeRange);
        setGeneradosCount(ticketCounts.totalTickets);
        setVerificadosCount(ticketCounts.scannedTickets);

        const { salesData, totalAmount } = await getSalesData(timeRange);
        setSalesData(salesData);
        setAmountOfSales(ticketCounts.totalTickets * 3);

        const stats = await getTicketStatsByUser(timeRange);
        setGeneratedByStats(stats.generatedByStats);
        setScanByStats(stats.scanByStats);
      }
    } catch (error) {
      console.error("Error fetching stats", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchData();
  }, [userId])


  useEffect(() => {
    fetchTicketCounts(timeRangeData);
  }, [timeRangeData]);


  return (
    <ScrollView>
      <VStack paddingBottom='$40' marginHorizontal="$8">
        <Box
          marginTop='$10'
        >
          {!userData ? (
            <Skeleton colorMode='light' width={"50%"} />
          ) : (
            <Text
              fontSize="$3xl"
              fontWeight="$bold"
              fontFamily="GT-Walsheim Pro-bold"
              paddingTop='$2'
              color='$black'
              lineHeight={'$2xl'}
            >
              Bienvenido Dr {userData.fullName}
            </Text>
          )}


          <Box
            marginTop='$5'
            width='$1/2'
          >

            <ActionSheet
              value={timeRangeString}
              showActionsheet={showActionsheet}
              handleClose={handleClose}
              timeRangeSelected={(time) => timeSelected(time)}
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
            {loading ? (
              <Skeleton colorMode='light' width={"50%"} />
            ) : (
              <Text
                paddingTop="$5"
                fontSize="$3xl"
                fontWeight="$bold"
                fontFamily="GT-Walsheim Pro-bold"
                color='$black'

              >
                {generadosCount}
              </Text>
            )}

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
            {loading ? (
              <Skeleton colorMode='light' width={"50%"} />
            ) : (
              <Text
                paddingTop="$5"
                fontSize="$3xl"
                fontWeight="$bold"
                fontFamily="GT-Walsheim Pro-bold"
                color='$black'

              >
                {verificadosCount}
              </Text>
            )}
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
              {loading && amountOfSales ? (
                <Box
                  paddingHorizontal="$6"
                >
                  <Skeleton colorMode='light' width={"50%"} />
                </Box>
              ) : (
                <Text
                  padding="$5"
                  fontSize="$3xl"
                  fontWeight="$bold"
                  fontFamily="GT-Walsheim Pro-bold"
                  color='$black'

                >
                  {amountOfSales} Bs
                </Text>
              )}
            </Box>
            <Text fontSize='$sm' paddingHorizontal="$6">Ingreso Total</Text>
          </VStack>
          {loading ? (
            <Box
              paddingHorizontal="$6"
            >

              <Skeleton colorMode='light' width={"50%"} />
            </Box>
          ) : (
            // <></>
            <LineGraph
              data={salesData}
              width={parentDimensions.width}
              pointFocus={(dataPoint) => pointFocus(dataPoint)}
              pointUnfocus={() => pointUnfocus()}
            />
          )}
        </Box>

        <Box
          onLayout={handleLayoutTables}
          marginTop="$10"
          height="$96"
          width="$full"
          bgColor="$white"
          borderRadius="$2xl"
          softShadow="1"
          display="flex"
        >
          {loading ? (
            <Box
              padding="$6"
            >
              <Skeleton colorMode='light' width={"50%"} />
            </Box>
          ) : (
            <TicketStatsTable width={parentDimensions.width/2} generatedByStats={generatedByStats} />
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
          {loading ? (
            <Box
              padding="$6"
            >
              <Skeleton colorMode='light' width={"50%"} />
            </Box>
          ) : (
            <TicketScanStatsTable width={parentDimensions.width/2} scanByStats={scanByStats} />
          )}

        </Box>
      </VStack>
    </ScrollView>
  );
};

export default index;
