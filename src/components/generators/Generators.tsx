import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./Style";
import { IGeneratorsProps } from "../../../assets/types/generators";

export default function Generators(props: IGeneratorsProps) {
  const { generators, handleClick } = props;
  const renderGenerators = generators.map((it, index) => (
    <View key={index}>
      <Pressable
        key={`generator${index}`}
        onPress={() => handleClick(index)}
        style={{
          ...styles.generator_item,
          backgroundColor: `${it.price < 256 ? "rgba(79, 168, 82, 1)" : "green"}`,
        }}
      >
        <View style={styles.generator_item_level}>
          <Text style={styles.titleText}>
            Lvl: {it.level > 24 ? "Max" : it.level}
          </Text>
        </View>
        <Text style={styles.titleText}>${it.price}</Text>
      </Pressable>
    </View>
  ));
  return <View style={styles.generators}>{renderGenerators}</View>;
}
