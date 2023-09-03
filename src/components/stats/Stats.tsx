import React from "react";
import { View, Text } from "react-native";
import { styles } from "./Style";
import { IStatsProps } from "../../../assets/types/stats";

export default function Stats(props: IStatsProps) {
  const { clickerPower, generatorsCount } = props;
  return (
    <View style={styles.stats}>
      <Text>
        Сила клікера: {clickerPower} | Генератори {generatorsCount}/10
      </Text>
    </View>
  );
}
