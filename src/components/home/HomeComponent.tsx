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
import { useSound } from "../../hooks/useSound";
import { Constants } from "../../constants";

interface HomeComponentProps {
  shouldLoadGame: boolean;
  onBackToMenu: () => void;
}

export const HomeComponent: FC<HomeComponentProps> = ({
  shouldLoadGame,
  onBackToMenu,
}): JSX.Element => {
  const { lang, changeLang, getText } = useLanguage();
  const gameLogic = useGameLogic();
  const { playClickSound, playPurchaseSound } = useSound();

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
    if (gameLogic.canBuyGeneratorPower && !gameLogic.isGeneratorsPower) {
      playPurchaseSound();
    }
    gameLogic.handleBuyGeneratorPowerClick();
  }, [playPurchaseSound, gameLogic]);

  const handleBuyClickerPower = useCallback(() => {
    if (gameLogic.balance > gameLogic.nextClickerPowerPrice) {
      playPurchaseSound();
    }
    gameLogic.handleBuyClickerPower();
  }, [playPurchaseSound, gameLogic]);

  const handleBuyGenerator = useCallback(() => {
    if (gameLogic.canBuyGenerator) {
      playPurchaseSound();
    }
    gameLogic.handleBuyGeneratorClick();
  }, [playPurchaseSound, gameLogic]);

  const handleBuyGeneratorControll = useCallback(() => {
    if (gameLogic.canBuyGeneratorControll) {
      playPurchaseSound();
    }
    gameLogic.handleBuyGeneratorControllClick();
  }, [playPurchaseSound, gameLogic]);

  const handleBuyGold = useCallback(() => {
    if (gameLogic.canBuyGold) {
      playPurchaseSound();
    }
    gameLogic.handleBuyGoldClick();
  }, [playPurchaseSound, gameLogic]);

  return (
    <View style={styles.App}>
      <Header
        lang={lang}
        onChangeLang={changeLang}
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
