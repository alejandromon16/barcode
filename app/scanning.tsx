import { Box, ButtonIcon, Text, Button, ButtonText, CloseCircleIcon } from '@gluestack-ui/themed';
import { Camera, CameraType } from 'expo-camera';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { checkStatusTicket } from '../src/services/CheckStatusTicket';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [qrValue, setQrValue ] = useState<string | null>(null);
  const [scanning, setScanning] = useState<boolean>(false);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const handleScannedCode = ({data}) => {
    console.log(data);
    setQrValue(data);
    setScanning(true);

    checkTicket(data);
  
  }

  const checkTicket = async (qrValue:string) => {
    if(qrValue){
      const status = await checkStatusTicket(qrValue);
    }
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type}
        onBarCodeScanned={scanning ? undefined: handleScannedCode}
        focusDepth={0.2}
      >
        <MotiView
          style={{
            display:'flex',
            flex:1
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

          { scanning && (
              <Box
                bottom={0}
                width={'$full'}
                bgColor='$white'
                borderRadius={'$2xl'}
                position='absolute'
                padding={'$5'}
              >
                <Box
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  padding={'$10'}
                  rowGap={'$10'}
                >
                  <Box
                    alignSelf='flex-end'
                  >
                      <Button
                        variant='outline'
                        borderColor='$white'
                        onPress={() => setScanning(false)}
                      >
                        <ButtonIcon color='$coolGray500'  as={CloseCircleIcon} />
                      </Button>
                  </Box>

                  <Box>
                    <ActivityIndicator />
                  </Box>

                  <Text
                    fontWeight='$bold'
                    fontFamily='GT Walsheim-pro bold'
                    fontSize='$2xl'
                    color='$black'
                  >Procesando...</Text>
                  <Text>Procesando la validez del Codigo Qr</Text>
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
