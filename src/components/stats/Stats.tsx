import React from "react";
import { View, Text } from "react-native";
import { styles } from "./Style";
import { IStatsProps } from "../../../assets/types/stats";

export default function Stats(props: IStatsProps) {
  const { clickerPower, generatorsCount, titleOne, titleTwo} = props;
  return (
    <View style={styles.stats}>
      <Text style={styles.titleText}>
        {titleOne}: {clickerPower} | {titleTwo} {generatorsCount}/18
      </Text>
    </View>
  );
}
