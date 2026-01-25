import React, { useMemo, useState} from "react"
import { Text, Pressable, Image, ImageSourcePropType } from "react-native";
import { styles } from "./Style";
import { IButtonLangProps } from "../../../assets/types/button_lang";

const FLAG_IMAGES: Record<number, ImageSourcePropType> = {
  0: require("../../../assets/flags/ukraine.png"),
  1: require("../../../assets/flags/united-kingdom.png"),
  2: require("../../../assets/flags/germany.png"),
};
export default function ButtonLang(props: IButtonLangProps) {
  const { onPress, constants, title } = props;
  const flagSource = useMemo(() => {
    return FLAG_IMAGES[constants] || FLAG_IMAGES[0]; // Повертаємо укр. прапор за замовчуванням
  }, [constants]);
  
  

  return (
    <Pressable
      onPress={onPress} 
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 } // Додаємо візуальний відгук при натисканні
      ]}
    >
     
      <Text style={styles.titleText}>{title}</Text>
      <Image
        style={styles.tinyLogo}
        source={flagSource} // Використовуємо вже підготовлений require
      />
    </Pressable>
  );
}
