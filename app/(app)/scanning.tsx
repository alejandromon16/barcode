// import React from 'react';
// import { StyleSheet, Text } from 'react-native';
// import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

// const App = () => {
//   const device = useCameraDevice('back');
//   const { hasPermission, requestPermission } = useCameraPermission();
//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13'],
//     onCodeScanned: (codes) => {
//       console.log(`Scanned ${codes.length} codes!`)
//     }
//   })

//   if (device == null) {
//     return <NoCameraDeviceError />;
//   }

//   if (!hasPermission) {
//     // You may want to show a permission request UI here
//     requestPermission();
//     return null;
//   }

//   return (
//     <Camera
//       style={StyleSheet.absoluteFill}
//       codeScanner={codeScanner}
//       device={device}
//       isActive={true}
//       // Add other camera props as needed
//     />
//   );
// };

// const NoCameraDeviceError = () => (
//   // You can customize the error message or UI as needed
//   <Text style={{ textAlign: 'center', marginTop: 20 }}>
//     No back camera device found.
//   </Text>
// );

// export default App;
