import React, { FC, JSX, useEffect, useCallback } from "react";
import { View } from "react-native";
import { styles } from "./Style";
import Stats from "../stats";
import Generators from "../generators";
import Controlls from "../controlls";
import Header from "../header";
import ShopPanel from "../shop-panel";
import { useGameLogic } from "../../hooks/useGameLogic";
import { useLanguage } from "../../hooks/useLanguage";
import { Constants } from "../../constants";

interface HomeComponentProps {
  shouldLoadGame: boolean;
  onBackToMenu: () => void;
  playClickSound: () => void;
  playPurchaseSound: () => void;
}

export const HomeComponent: FC<HomeComponentProps> = ({
  shouldLoadGame,
  onBackToMenu,
  playClickSound,
  playPurchaseSound,
}): JSX.Element => {
  const gameLogic = useGameLogic();
  const { getText } = useLanguage({
    initialLang: gameLogic.lang as 0 | 1 | 2,
    onLangChange: gameLogic.handleLangChange,
  });

  useEffect(() => {
    if (shouldLoadGame) {
      gameLogic.handleLoadGame();
    }
  }, [shouldLoadGame]);

  // Обгортки для обробників подій з звуками
  const handleClickerClick = useCallback(() => {
    playClickSound();
    gameLogic.handleClickerClick();
  }, [playClickSound, gameLogic.handleClickerClick]);

  const handleBuyGeneratorPower = useCallback(() => {
    playPurchaseSound();
    gameLogic.handleBuyGeneratorPowerClick();
  }, [playPurchaseSound, gameLogic.handleBuyGeneratorPowerClick]);

  const handleBuyClickerPower = useCallback(() => {
    playPurchaseSound();
    gameLogic.handleBuyClickerPower();
  }, [playPurchaseSound, gameLogic.handleBuyClickerPower]);

  const handleBuyGenerator = useCallback(() => {
    playPurchaseSound();
    gameLogic.handleBuyGeneratorClick();
  }, [playPurchaseSound, gameLogic.handleBuyGeneratorClick]);

  const handleBuyGeneratorControll = useCallback(() => {
    playPurchaseSound();
    gameLogic.handleBuyGeneratorControllClick();
  }, [playPurchaseSound, gameLogic.handleBuyGeneratorControllClick]);

  const handleBuyGold = useCallback(() => {
    playPurchaseSound();
    gameLogic.handleBuyGoldClick();
  }, [playPurchaseSound, gameLogic.handleBuyGoldClick]);

  return (
    <View style={styles.App}>
      <Header
        balanceTitle={getText('balance')}
        goldBalance={gameLogic.goldBalance}
        balance={gameLogic.balance}
        styles={styles}
        backToMenuText={getText('backToMenu')}
        onBackToMenu={onBackToMenu}
      />

      <View style={styles.score_components}>
        <Stats
          clickerPower={gameLogic.clickerPower}
          generatorsCount={gameLogic.generators.length}
          titleOne={getText('stats', 0)}
          titleTwo={getText('stats', 1)}
        />
        <Controlls
          controlls={gameLogic.controlls}
          clickerPower={gameLogic.clickerPower}
          onClickerClick={handleClickerClick}
          onControllClick={gameLogic.handleControllClick}
          canSumGenerators={gameLogic.canSumGenerators}
          titleOne={getText('controls', 0)}
          titleTwo={getText('controls', 1)}
        />
        <View style={styles.generators_wrapper}>
          <Generators
            generators={gameLogic.generators}
            handleClick={gameLogic.handleGeneratorClick}
            isGeneratorsPower={gameLogic.isGeneratorsPower}
          />
        </View>
      </View>

      <ShopPanel
        onBuyGeneratorPower={handleBuyGeneratorPower}
        onBuyClickerPower={handleBuyClickerPower}
        onBuyGenerator={handleBuyGenerator}
        onBuyGeneratorControll={handleBuyGeneratorControll}
        onBuyGold={handleBuyGold}
        onVibrationToggle={gameLogic.handleVibrationToggle}
        canBuyGeneratorPower={gameLogic.canBuyGeneratorPower}
        canBuyClickerPower={gameLogic.balance > gameLogic.nextClickerPowerPrice}
        canBuyGenerator={gameLogic.canBuyGenerator}
        canBuyGeneratorControll={gameLogic.canBuyGeneratorControll}
        canBuyGold={gameLogic.canBuyGold}
        canToggleVibration={gameLogic.balance > Constants.VIBRATION_PRICE}
        generatorPowerPrice={gameLogic.nextGeneratorPowerPrice}
        clickerPowerPrice={gameLogic.nextClickerPowerPrice}
        generatorPrice={gameLogic.nextBuyGeneratorPrice}
        buyGenText={getText('buyGen')}
        buyPowerText={getText('buyPower')}
        quickCollectionText={getText('quickCollection')}
        buyGoldText={getText('buyGold')}
        vibrationText={gameLogic.isVibration ? getText('vibration', 0) : getText('vibration', 1)}
        isVibration={gameLogic.isVibration}
        isGeneratorsPower={gameLogic.isGeneratorsPower}
        styles={styles}
      />
    </View>
  );
};

export default HomeComponent;
