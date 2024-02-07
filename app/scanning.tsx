
import { Box, ButtonIcon, ButtonText, Text, Button, CloseCircleIcon, VStack, HStack } from '@gluestack-ui/themed';
import { Camera, CameraType } from 'expo-camera';
import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { TicketStatus, checkStatusTicket } from '@/services/CheckStatusTicket';
import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import useAuthStore from '@/stores/auth.store';

const StackScreenConfig = () => {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: 'Escaner',
        headerBackTitle: 'volver'
      }}
    />
  );
};

export default function App() {
  const { userId } = useAuthStore();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [qrValue, setQrValue] = useState<string | null>(null);
  const [ticketStatus, setTicketStatus] = useState<TicketStatus>("PROCESSING")
  const [scanning, setScanning] = useState<boolean>(false);
  const animation = useRef(null);


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      height="$full"
    >

      <VStack
        display="flex"
        flex={1}
        marginHorizontal={"$10"}
      >
        <Box
          marginTop={"$1/3"}
          display="flex"
          justifyContent="center"
        >
          <VStack>
  
            <Box height='$5' />

            <Box>
              <Text>
                Necesitamos permiso para utilizar la camara.
              </Text>
            </Box>
          </VStack>
        </Box>

        <Box height='$5' />

        <Box>
          <Button
            onPress={requestPermission}
            width={"$full"}
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
          >
            <ButtonText color={"$black"}>Permitir Permiso</ButtonText>
          </Button>
        </Box>
      </VStack>
    </Box>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const handleScannedCode = ({ data }) => {
    if(data != qrValue){
      setQrValue(data);
      setTicketStatus('PROCESSING');
      setScanning(true);
      checkTicket(data);
    }
  }

  const checkTicket = async (qrValue: string) => {
    if (qrValue) {
      const status = await checkStatusTicket(qrValue, userId);
      setTicketStatus(status);
    }
  }


  return (
    <View style={styles.container}>
      <StackScreenConfig />
      <Camera
        style={styles.camera}
        type={type}
        onBarCodeScanned={handleScannedCode}
        focusDepth={0.2}
      >
        <MotiView
          style={{
            display: 'flex',
            flex: 1
          }}
          from={{
            translateY: 200 // Set the initial position outside the screen
          }}
          animate={{
            translateY: 0, // Move the box to the normal position
          }}
          transition={{
            type: 'timing',
            duration: 1400,
            easing: Easing.ease
          }}
        >

          {scanning && (
            <Box
              bottom={0}
              width={'$full'}
              bgColor='$white'
              borderTopLeftRadius={'$2xl'}
              borderTopRightRadius={'$2xl'}
              position='absolute'
              padding={'$5'}
            >
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                padding={'$10'}
              >
                <Box
                  alignSelf='flex-end'
                >
                  <Button
                    size='$2xl'
                    variant='outline'
                    borderColor='$white'
                    onPress={() => setScanning(false)}
                  >
                    <ButtonIcon color='$coolGray500' as={CloseCircleIcon} />
                  </Button>
                </Box>

                <Box height='$5' />

                {ticketStatus == "PROCESSING" && (

                  <>
                    <Box>
                      <ActivityIndicator />

                    </Box>
                    <Box height='$5' />

                    <Text
                      fontWeight='$bold'
                      fontFamily='GT Walsheim-pro bold'
                      fontSize='$2xl'
                      color='$black'
                    >Procesando...</Text>

                    <Box height='$5' />

                    <Text
                      textAlign='center'
                    >Procesando la validez del Codigo Qr</Text>

                  </>
                )}

                {ticketStatus == "VALID" && (

                  <>
                    <Box>
                      <LottieView
                        autoPlay
                        loop={false}
                        ref={animation}
                        style={{
                          width: 60,
                          height: 60,
                          backgroundColor: '#fffff',
                        }}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={require('../src/assets/okay-icon.json')}
                      />
                    </Box>
                    <Box height='$5' />

                    <Text
                      fontWeight='$bold'
                      fontFamily='GT Walsheim-pro bold'
                      fontSize='$2xl'
                      color='$black'
                    >Ticket Valido</Text>


                  </>
                )}

                {ticketStatus == "ALREADY_SCAN" && (

                  <>
                    <Box>
                      <LottieView
                        autoPlay
                        loop={false}
                        ref={animation}
                        style={{
                          width: 60,
                          height: 60,
                          backgroundColor: '#fffff',
                        }}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={require('../src/assets/warning-icon.json')}
                      />
                    </Box>
                    <Box height='$5' />

                    <Text
                      fontWeight='$bold'
                      fontFamily='GT Walsheim-pro bold'
                      fontSize='$2xl'
                      color='$black'
                    >Ticket Invalido</Text>

                    <Box height='$5' />

                    <Text
                      textAlign='center'
                    >Ticket ya fue escaneado</Text>
                  </>
                )}

                {ticketStatus == "INVALID" && (

                  <>
                    <Box>
                      <LottieView
                        autoPlay
                        loop={false}
                        ref={animation}
                        style={{
                          width: 60,
                          height: 60,
                          backgroundColor: '#fffff',
                        }}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={require('../src/assets/error-icon.json')}
                      />
                    </Box>
                    <Box height='$5' />

                    <Text
                      fontWeight='$bold'
                      fontFamily='GT Walsheim-pro bold'
                      fontSize='$2xl'
                      color='$black'

                    >Ticket Invalido</Text>

                    <Box height='$5' />

                    <Text
                      textAlign='center'
                    >El codigo Qr no fue emitido por la Terminal</Text>
                  </>
                )}



              </Box>
            </Box>
          )}
        </MotiView>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
