import React, { useRef } from "react";
import { View, TouchableOpacity, Button } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot, { captureRef } from "react-native-view-shot";
import { Stack } from "expo-router";
import { Box, VStack, HStack, Text, Image } from "@gluestack-ui/themed";
import * as FileSystem from "expo-file-system";
import { saveToLibraryAsync } from "expo-media-library";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import firebase from "../../src/config/firebase/firebase";
import * as Crypto from 'expo-crypto';

const StackDataScreenConfig = () => {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        title: "Datos",
      }}
    />
  );
};

const YourComponent = () => {
  const viewShotRef = useRef();

  const saveToCameraRoll = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: "png",
        quality: 1,
        result: "tmpfile",
      });
  
      const response = await fetch(uri);
      const blob = await response.blob();
  
      console.log("uri: ", uri);
  
      const storageRef = ref(firebase.storage, `/tickets/${Crypto.randomUUID()}.png`);
      uploadBytes(storageRef, blob)
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      var data = "token=3pbxjpnq0pvlxr45&to=%2B59175002909&image=" + encodeURIComponent(downloadURL) + "&caption=image Caption";

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;

      xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
              console.log(this.responseText);
          }
      });

      xhr.open("POST", "https://api.ultramsg.com/instance76014/messages/image");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);

    
    } catch (error) {
      console.error("Error saving to Camera Roll:", error);
    }
  };
  
  
  return (
    <>
      <StackDataScreenConfig />

      <View
        style={{
          position: "absolute",
          width: "100%",
          top: -1000,
        }}
      >
        <View ref={viewShotRef}>
          <Box backgroundColor="$black" width="$full">
            <Box
              backgroundColor="$white"
              borderRadius="$2xl"
              softShadow="2"
              marginHorizontal="$5"
              marginVertical="$10"
              padding="$7"
            >
              <VStack rowGap={"$5"} paddingBottom="$10">
                <HStack justifyContent="space-between">
                  <Text
                    fontFamily={"GT Walsheim-pro bold"}
                    fontWeight="$bold"
                    color="$black"
                  >
                    Uso de terminal
                  </Text>
                  <Text>Jue, 20 Ene 2024</Text>
                </HStack>
                <VStack justifyContent="center" alignItems="center">
                  <Image
                    size="2xxl"
                    resizeMode="contain"
                    source={require("../../src/assets/images/logoticket.png")}
                    alt="hero"
                  />
                  <QRCode size={200} value="Your QR Code Data" />
                </VStack>
              </VStack>
            </Box>
          </Box>
        </View>
      </View>

      <Button title="Save to Camera Roll" onPress={saveToCameraRoll} />
    </>
  );
};

export default YourComponent;
