import React from "react";
import { Text, Pressable } from "react-native";
import { styles } from "./Style";
import { IButtonSkillsProps } from "../../../assets/types/button_skills";

export default function ButtonSkills(props: IButtonSkillsProps) {
  const { onPress, disabled, constants, title } = props;

  return (
    <Pressable
      onPress={onPress}
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
  );
}
