import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./Style";
import { IControllsProps } from "../../../.expo/types/controlls";

export default function Controlls(props: IControllsProps) {
  const {
    clickerPower,
    onClickerClick,
    onControllClick,
    controlls,
    canSumGenerators,
  } = props;

  return (
    <View style={styles.controlls}>
      <Pressable style={styles.controlls_button} onPress={onClickerClick}>
        <Text>Отримати ${clickerPower}</Text>
      </Pressable>
      {controlls.generator && (
        <Pressable
          style={styles.controlls_button}
          disabled={!canSumGenerators}
          onPress={() => onControllClick("generator")}
        >
          <Text>Сума генератора</Text>
        </Pressable>
      )}
    </View>
  );
}
