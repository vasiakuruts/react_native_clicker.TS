import React, { FC } from 'react';
import { View } from 'react-native';
import ButtonSkills from '../button_skills/ButtonSkills';
import { Constants } from '../../constants';

interface ShopPanelProps {
  // Обробники
  onBuyGeneratorPower: () => void;
  onBuyClickerPower: () => void;
  onBuyGenerator: () => void;
  onBuyGeneratorControll: () => void;
  onBuyGold: () => void;
  onVibrationToggle: () => void;

  // Стан кнопок
  canBuyGeneratorPower: boolean;
  canBuyClickerPower: boolean;
  canBuyGenerator: boolean;
  canBuyGeneratorControll: boolean;
  canBuyGold: boolean;
  canToggleVibration: boolean;

  // Ціни
  generatorPowerPrice: number;
  clickerPowerPrice: number;
  generatorPrice: number;

  // Тексти (локалізація)
  buyGenText: string;
  buyPowerText: string;
  quickCollectionText: string;
  buyGoldText: string;
  vibrationText: string;

  // Вібрація
  isVibration: boolean;
  isGeneratorsPower: boolean;

  // Стилі
  styles: any;
}

export const ShopPanel: FC<ShopPanelProps> = ({
  onBuyGeneratorPower,
  onBuyClickerPower,
  onBuyGenerator,
  onBuyGeneratorControll,
  onBuyGold,
  onVibrationToggle,
  canBuyGeneratorPower,
  canBuyClickerPower,
  canBuyGenerator,
  canBuyGeneratorControll,
  canBuyGold,
  canToggleVibration,
  generatorPowerPrice,
  clickerPowerPrice,
  generatorPrice,
  buyGenText,
  buyPowerText,
  quickCollectionText,
  buyGoldText,
  vibrationText,
  isVibration,
  isGeneratorsPower,
  styles,
}) => {
  return (
    <View style={styles.content_wrapper}>
      <View style={styles.content_wrapper_item}>
        <ButtonSkills
          onPress={onBuyGeneratorPower}
          disabled={!canBuyGeneratorPower || isGeneratorsPower}
          constants={generatorPowerPrice}
          title={`${buyGenText} +1 Lvl`}
        />
        <ButtonSkills
          onPress={onBuyClickerPower}
          disabled={!canBuyClickerPower}
          constants={clickerPowerPrice}
          title={`${buyPowerText} +1`}
        />
      </View>
      <View style={styles.content_wrapper_item}>
        <ButtonSkills
          onPress={onBuyGenerator}
          disabled={!canBuyGenerator}
          constants={generatorPrice}
          title={buyGenText}
        />
        <ButtonSkills
          onPress={onBuyGeneratorControll}
          disabled={!canBuyGeneratorControll}
          constants={Constants.CONTROLL_GENERATOR_PRICE}
          title={quickCollectionText}
        />
      </View>
      <View style={styles.content_wrapper_item}>
        <ButtonSkills
          onPress={onBuyGold}
          disabled={!canBuyGold}
          constants={Constants.GOLD_PRICE}
          title={buyGoldText}
        />
        <ButtonSkills
          onPress={onVibrationToggle}
          disabled={!canToggleVibration}
          constants={Constants.VIBRATION_PRICE}
          title={vibrationText}
        />
      </View>
    </View>
  );
};

export default ShopPanel;
