import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./Style";
import { IGeneratorsProps } from "../../../assets/types/generators";

export default function Generators(props: IGeneratorsProps) {
  const { generators, handleClick, generatorsPower } = props;
  const renderGenerators = generators.map((it, index) => (
    <View key={index}>
      <Pressable
        key={`generator${index}`}
        onPress={() => handleClick(index)}
        style={{
          ...styles.generator_item,
          backgroundColor: `${it < 256 ? "rgba(79, 168, 82, 1)" : "green"}`,
        }}
      >
        <View style={styles.generator_item_level}>
          <Text>Lvl: {generatorsPower > 10 ? "Max" : generatorsPower}</Text>
        </View>
        <Text>${it}</Text>
      </Pressable>
    </View>
  ));
  return <View style={styles.generators}>{renderGenerators}</View>;
}
// { backgroundColor: `rgba(0,${it < 256 ? it : 255},0)` }
