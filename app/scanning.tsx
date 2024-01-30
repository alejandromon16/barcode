import { Box, Text } from '@gluestack-ui/themed';
import { Camera, CameraType } from 'expo-camera';
import React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

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
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type}
        onBarCodeScanned={handleScannedCode}
      >

        <Box
          bottom={0}
          width={'$full'}
          height={'$1/3'}
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
            <Text
               fontWeight='$bold'
               fontFamily='GT Walsheim-pro bold'
               fontSize='$2xl'
               color='$black'
            >Procesando...</Text>
            <Text>Procesando la validez del Codigo Qr</Text>
          </Box>
        </Box>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
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
