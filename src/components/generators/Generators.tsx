import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { styles } from "./Style";
import { IGeneratorsProps } from "../../../assets/types/generators";

const GeneratorItem = ({ generator, index, handleClick, isGeneratorsPower }: any) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const powerGlowAnim = useRef(new Animated.Value(0)).current;

  // Анімація підсвічування при купівлі generator power
  useEffect(() => {
    if (isGeneratorsPower) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(powerGlowAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
          }),
          Animated.timing(powerGlowAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      powerGlowAnim.stopAnimation();
      powerGlowAnim.setValue(0);
    }
  }, [isGeneratorsPower]);

  useEffect(() => {
    // Pulse анімація коли генератор майже повний (>50% від максимуму)
    if (generator.price > 500) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Glow ефект
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
      glowAnim.setValue(0);
    }
  }, [generator.price]);

  const backgroundColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      generator.price < 256 ? "rgba(79, 168, 82, 1)" : "rgba(0, 200, 0, 1)",
      generator.price < 256 ? "rgba(100, 200, 100, 1)" : "rgba(50, 255, 50, 1)",
    ],
  });

  const borderColor = powerGlowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255, 215, 0, 0)", "rgba(255, 215, 0, 1)"],
  });

  const borderWidth = powerGlowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale: pulseAnim }],
      }}
    >
      <Animated.View
        style={{
          ...styles.generator_item,
          backgroundColor,
          borderColor,
          borderWidth,
        }}
      >
        <Pressable
          onPress={() => handleClick(index)}
          style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.generator_item_level}>
            <Text style={styles.titleText}>
              Lvl: {generator.level}
            </Text>
          </View>
          <Text style={styles.titleText}>${generator.price}</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

export default function Generators(props: IGeneratorsProps & { isGeneratorsPower?: boolean }) {
  const { generators, handleClick, isGeneratorsPower } = props;

  return (
    <View style={styles.generators}>
      {generators.map((generator, index) => (
        <GeneratorItem
          key={`generator${index}`}
          generator={generator}
          index={index}
          handleClick={handleClick}
          isGeneratorsPower={isGeneratorsPower}
        />
      ))}
    </View>
  );
}
