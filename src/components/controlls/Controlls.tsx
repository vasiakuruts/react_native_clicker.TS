import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./Style";
import { IControllsProps } from "../../../assets/types/controlls";

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
        <Text style={styles.titleText}>Отримати ${clickerPower}</Text>
      </Pressable>
      {controlls.generator && (
        <Pressable
          style={styles.controlls_button}
          disabled={!canSumGenerators}
          onPress={() => onControllClick("generator")}
        >
          <Text style={styles.titleText}>Швидкий збір</Text>
        </Pressable>
      )}
    </View>
  );
}
