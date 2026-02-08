import React, { useRef } from "react";
import { Text, Pressable, Animated } from "react-native";
import { styles } from "./Style";
import { IButtonSkillsProps } from "../../../assets/types/button_skills";

export default function ButtonSkills(props: IButtonSkillsProps) {
  const { onPress, disabled, constants, title } = props;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handlePressWithAnimation = () => {
    if (disabled) return;

    // Bounce анімація при покупці
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    onPress();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-5deg', '5deg'],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }, { rotate }],
      }}
    >
      <Pressable
        onPress={handlePressWithAnimation}
        disabled={disabled}
        style={{
          ...styles.button,
          backgroundColor: `${
            disabled ? "rgba(0, 225, 118, 0.4)" : "rgba(79, 168, 82, 1)"
          }`,
        }}
      >
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.titleText}>(${constants})</Text>
      </Pressable>
    </Animated.View>
  );
}
