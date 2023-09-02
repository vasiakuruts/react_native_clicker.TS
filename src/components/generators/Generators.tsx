import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./Style";
import { IGeneratorsProps } from "../../../.expo/types/generators";

export default function Generators(props: IGeneratorsProps) {
  const { generators, handleClick, generatorsPower } = props;
  return (
    <View style={styles.generators}>
      <Text>
        {generators &&
          generators.map((it, index) => (
            <Pressable
              key={`generator${index}`}
              onPress={() => {
                console.log("====================================");
                console.log(index);
                console.log("====================================");
              }}
              style={styles.generator_item}
            >
              <View style={styles.generator_item_level}>
                <Text>
                  Lvl: {generatorsPower > 10 ? "Max" : generatorsPower}
                </Text>
              </View>
              <Text>${it}</Text>
            </Pressable>
          ))}
      </Text>
    </View>
  );
}
// { backgroundColor: `rgba(0,${it < 256 ? it : 255},0)` }
