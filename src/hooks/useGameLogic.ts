import { useState, useCallback, useEffect } from 'react';
import { Vibration } from 'react-native';
import { IGeneratorItem } from '../../assets/types/generators';
import { IControls } from '../../assets/types/controlls';
import { Constants } from '../constants';
import { useGameStorage, GameState } from './useGameStorage';

export const useGameLogic = () => {
  const { saveGame, loadGame, clearSave } = useGameStorage();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const [goldBalance, setGoldBalance] = useState<number>(0);
  const [clickerPower, setClickerPower] = useState<number>(1);
  const [priceGenerator, setPriceGenerator] = useState<number>(1);
  const [generatorsPower, setGeneratorsPower] = useState<number>(1);
  const [isGeneratorsPower, setIsGeneratorsPower] = useState<boolean>(false);
  const [generators, setGenerators] = useState<IGeneratorItem[]>([]);
  const [controlls, setControlls] = useState<IControls>({});
  const [isVibration, setIsVibration] = useState<boolean>(false);

  // Статистика
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [totalEarned, setTotalEarned] = useState<number>(0);

  // Обчислювані значення
  const nextClickerPowerPrice = (clickerPower + 1) * 16;
  const nextGeneratorPowerPrice = (generatorsPower + 1) * 10;
  const nextBuyGeneratorPrice = (priceGenerator + 1) * 5000;

  const canBuyGenerator = generators.length < 10 && balance >= nextBuyGeneratorPrice;
  const canBuyGold = balance >= Constants.GOLD_PRICE;
  const canBuyGeneratorControll =
    balance >= Constants.CONTROLL_GENERATOR_PRICE && !controlls.generator;
  const canSumGenerators = generators.some((it) => it.price > 0);
  const canBuyGeneratorPower =
    balance >= nextGeneratorPowerPrice && generators.length > 0;

  // Обробники подій
  const handleClickerClick = useCallback(() => {
    setBalance(balance + clickerPower);
    setTotalClicks(totalClicks + 1);
    setTotalEarned(totalEarned + clickerPower);
  }, [balance, clickerPower, totalClicks, totalEarned]);

  const handleBuyClickerPower = useCallback(() => {
    if (balance >= nextClickerPowerPrice) {
      setBalance(balance - nextClickerPowerPrice);
      setClickerPower(clickerPower + 1);
      setTotalSpent(totalSpent + nextClickerPowerPrice);
    }
  }, [balance, clickerPower, nextClickerPowerPrice, totalSpent]);

  const handleBuyGeneratorClick = useCallback(() => {
    if (canBuyGenerator) {
      setBalance(balance - nextBuyGeneratorPrice);
      setGenerators([...generators, { price: 0, level: 1 }]);
      setPriceGenerator(priceGenerator + 1);
      setTotalSpent(totalSpent + nextBuyGeneratorPrice);
    }
  }, [balance, priceGenerator, generators, canBuyGenerator, nextBuyGeneratorPrice, totalSpent]);

  const handleGeneratorClick = useCallback(
    (generatorIndex: number) => {
      const earned = generators[generatorIndex].price;
      setBalance(balance + earned);
      setTotalEarned(totalEarned + earned);
      const nextGenerators = Array.from(generators);
      nextGenerators[generatorIndex].price = 0;
      setGenerators(nextGenerators);
      if (isGeneratorsPower && nextGenerators[generatorIndex].level < 25) {
        const nextLvlGenerators = Array.from(generators);
        nextGenerators[generatorIndex].level += 1;
        setGenerators(nextLvlGenerators);
        setIsGeneratorsPower(false);
      }
    },
    [generators, balance, isGeneratorsPower, totalEarned]
  );

  const handleVibrationToggle = useCallback(() => {
    setBalance(balance - Constants.VIBRATION_PRICE);
    setIsVibration(!isVibration);
    setTotalSpent(totalSpent + Constants.VIBRATION_PRICE);
  }, [balance, isVibration, totalSpent]);

  const handleBuyGoldClick = useCallback(() => {
    if (canBuyGold) {
      setBalance(balance - Constants.GOLD_PRICE);
      setGoldBalance(goldBalance + 1);
      setTotalSpent(totalSpent + Constants.GOLD_PRICE);
    }
  }, [balance, goldBalance, canBuyGold, totalSpent]);

  const handleControllClick = useCallback(
    (controllId: string) => {
      if (controllId === 'generator') {
        let deltaBalance = 0;
        for (let i = 0; i < generators.length; i += 1) {
          deltaBalance += generators[i].price;
        }
        setBalance(balance + deltaBalance);
        setTotalEarned(totalEarned + deltaBalance);
        setGenerators(generators.map((it) => ({ ...it, price: 0 })));
      }
    },
    [balance, generators, totalEarned]
  );

  const handleBuyGeneratorControllClick = useCallback(() => {
    if (canBuyGeneratorControll) {
      setBalance(balance - Constants.CONTROLL_GENERATOR_PRICE);
      setControlls({
        ...controlls,
        generator: {},
      });
      setTotalSpent(totalSpent + Constants.CONTROLL_GENERATOR_PRICE);
    }
  }, [balance, controlls, canBuyGeneratorControll, totalSpent]);

  const handleBuyGeneratorPowerClick = useCallback(() => {
    if (canBuyGeneratorPower) {
      setBalance(balance - nextGeneratorPowerPrice);
      setGeneratorsPower(generatorsPower + 1);
      setIsGeneratorsPower(true);
      setTotalSpent(totalSpent + nextGeneratorPowerPrice);
    }
  }, [canBuyGeneratorPower, generatorsPower, balance, nextGeneratorPowerPrice, totalSpent]);

  // Методи збереження
  const handleLoadGame = useCallback(async () => {
    const savedState = await loadGame();
    if (savedState) {
      setBalance(savedState.balance);
      setGoldBalance(savedState.goldBalance);
      setClickerPower(savedState.clickerPower);
      setPriceGenerator(savedState.priceGenerator);
      setGeneratorsPower(savedState.generatorsPower);
      setGenerators(savedState.generators);
      setControlls(savedState.controlls);
      setIsVibration(savedState.isVibration);
      setTotalClicks(savedState.totalClicks || 0);
      setTotalSpent(savedState.totalSpent || 0);
      setTotalEarned(savedState.totalEarned || 0);
      setIsLoaded(true);
      return true;
    }
    setIsLoaded(true);
    return false;
  }, [loadGame]);

  const handleSaveGame = useCallback(async () => {
    const gameState: GameState = {
      balance,
      goldBalance,
      clickerPower,
      priceGenerator,
      generatorsPower,
      generators,
      controlls,
      isVibration,
      totalClicks,
      totalSpent,
      totalEarned,
    };
    return await saveGame(gameState);
  }, [
    balance,
    goldBalance,
    clickerPower,
    priceGenerator,
    generatorsPower,
    generators,
    controlls,
    isVibration,
    totalClicks,
    totalSpent,
    totalEarned,
    saveGame,
  ]);

  const handleResetGame = useCallback(async () => {
    await clearSave();
    setBalance(0);
    setGoldBalance(0);
    setClickerPower(1);
    setPriceGenerator(1);
    setGeneratorsPower(1);
    setIsGeneratorsPower(false);
    setGenerators([]);
    setControlls({});
    setIsVibration(false);
    setTotalClicks(0);
    setTotalSpent(0);
    setTotalEarned(0);
  }, [clearSave]);

  // Ефекти
  useEffect(() => {
    const timer = setInterval(() => {
      if (generators.length > 0) {
        const nextGenerators = generators.map((it) => {
          const newPrice = it.price + it.level * 2;
          return {
            ...it,
            price: newPrice > 999 ? 999 : newPrice,
          };
        });
        setGenerators(nextGenerators);
      }
    }, Constants.GENERATORS_DELAY_MS);
    return () => clearInterval(timer);
  }, [generators]);

  useEffect(() => {
    if (isVibration) {
      Vibration.vibrate(1);
    }
  }, [balance, isVibration]);

  // Автозбереження при зміні стану гри
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        handleSaveGame();
      }, 2); // Автозбереження через 2 секунди після зміни
      return () => clearTimeout(timer);
    }
  }, [
    balance,
    goldBalance,
    clickerPower,
    generators,
    controlls,
    isVibration,
    totalClicks,
    totalSpent,
    totalEarned,
    isLoaded,
    handleSaveGame,
  ]);

  return {
    // Стейти
    balance,
    goldBalance,
    clickerPower,
    generators,
    controlls,
    isVibration,
    isGeneratorsPower,
    isLoaded,

    // Статистика
    totalClicks,
    totalSpent,
    totalEarned,

    // Обчислювані значення
    nextClickerPowerPrice,
    nextGeneratorPowerPrice,
    nextBuyGeneratorPrice,
    canBuyGenerator,
    canBuyGold,
    canBuyGeneratorControll,
    canSumGenerators,
    canBuyGeneratorPower,

    // Обробники
    handleClickerClick,
    handleBuyClickerPower,
    handleBuyGeneratorClick,
    handleGeneratorClick,
    handleVibrationToggle,
    handleBuyGoldClick,
    handleControllClick,
    handleBuyGeneratorControllClick,
    handleBuyGeneratorPowerClick,

    // Методи збереження
    handleLoadGame,
    handleSaveGame,
    handleResetGame,
  };
};
