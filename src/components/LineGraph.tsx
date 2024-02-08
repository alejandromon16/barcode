import * as React from 'react';
import { useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LineChart from 'react-native-simple-line-chart';
import { LineGraphDataType, SALESTODAY } from '../constants/sales.constants';


interface LineGraphI {
    data: LineGraphDataType[];
    width: number;
    pointFocus: (dataPoint: any) => void;
    pointUnfocus: () => void;
}

export const LineGraph = ({
    width,
    data,
    pointFocus,
    pointUnfocus
}: LineGraphI) => {
    const [parentDimensions, setParentDimensions] = useState({
        width: 0,
        height: 0,
      });
  const colorGreen = '#14CC60';

  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setParentDimensions({ width, height });
  };
  
  return (
    <GestureHandlerRootView
      onLayout={handleLayout}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {parentDimensions.height > 0 && (
          <LineChart
            lines={[
              {
                data: data,
                activePointConfig: {
                  color: "black",
                  showVerticalLine: true,
                },
                lineColor: colorGreen,
                curve: "monotone",
                endPointConfig: {
                  color: colorGreen,
                  radius: 5,
                  animated: true,
                },
                activePointComponent: (point) => {
                  return (
                    <View
                      style={{
                        backgroundColor: "#32323275",
                        padding: 10,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "white" }}>
                        Personas: {point?.extraData?.formattedAmountPeople}
                      </Text>
                      <Text style={{ color: "white" }}>
                        {point?.extraData?.formattedTime} {point?.extraData?.formattedDate}
                      </Text>
                    </View>
                  );
                },
              },
            ]}
            backgroundColor={undefined}
            height={parentDimensions.height - 120}
            width={width}
            onPointFocus={(dataPoint) => pointFocus(dataPoint)}
            onPointLoseFocus={() => pointUnfocus()}

          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}