import React, { useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { styles } from "./Style";
import { IControllsProps } from "../../../assets/types/controlls";

export default function Controlls(props: IControllsProps) {
  const {
    clickerPower,
    onClickerClick,
    onControllClick,
    controlls,
    canSumGenerators,
    titleOne,
    titleTwo
  } = props;

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleClickWithAnimation = () => {
    // Анімація зменшення та збільшення
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    onClickerClick();
  };

  return (
    <View style={styles.controlls}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable style={styles.controlls_button} onPress={handleClickWithAnimation}>
          <Text style={styles.titleText}>{titleOne} ${clickerPower}</Text>
        </Pressable>
      </Animated.View>
      {controlls.generator && (
        <Pressable
          style={styles.controlls_button}
          disabled={!canSumGenerators}
          onPress={() => onControllClick("generator")}
        >
          <Text style={styles.titleText}>{titleTwo}</Text>
        </Pressable>
      )}
    </View>
  );
}
