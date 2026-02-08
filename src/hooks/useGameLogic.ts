import { useState, useCallback, useEffect } from 'react';
import { Vibration } from 'react-native';
import { IGeneratorItem } from '../../assets/types/generators';
import { IControls } from '../../assets/types/controlls';
import { Constants } from '../constants';
import { useGameStorage, GameState } from './useGameStorage';

export const useGameLogic = () => {
  const { saveGame, loadGame, clearSave } = useGameStorage();
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(0);
  const [goldBalance, setGoldBalance] = useState<number>(0);
  const [clickerPower, setClickerPower] = useState<number>(1);
  const [priceGenerator, setPriceGenerator] = useState<number>(1);
  const [generatorsPower, setGeneratorsPower] = useState<number>(1);
  const [isGeneratorsPower, setIsGeneratorsPower] = useState<boolean>(false);
  const [generators, setGenerators] = useState<IGeneratorItem[]>([]);
  const [controlls, setControlls] = useState<IControls>({});
  const [isVibration, setIsVibration] = useState<boolean>(false);
  const [lang, setLang] = useState<number>(0);

  // Статистика
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [totalEarned, setTotalEarned] = useState<number>(0);

  // Обчислювані значення
  const nextClickerPowerPrice = (clickerPower + 1) * 16;
  const nextGeneratorPowerPrice = (generatorsPower + 1) * 10;
  const nextBuyGeneratorPrice = (priceGenerator + 1) * Constants.GENERATOR_PRICE;

  const canBuyGenerator = generators.length < 18 && balance >= nextBuyGeneratorPrice;
  const canBuyGold = balance >= Constants.GOLD_PRICE;
  const canBuyGeneratorControll =
    balance >= Constants.CONTROLL_GENERATOR_PRICE && !controlls.generator;
  const canSumGenerators = generators.some((it) => it.price > 0);
  const canBuyGeneratorPower =
    balance >= nextGeneratorPowerPrice && generators.length > 0;

  // Обробники подій
  const handleClickerClick = useCallback(() => {
    setBalance(prev => prev + clickerPower);
    setTotalClicks(prev => prev + 1);
    setTotalEarned(prev => prev + clickerPower);
  }, [clickerPower]);

  const handleBuyClickerPower = useCallback(() => {
    setBalance(prev => {
      if (prev >= nextClickerPowerPrice) {
        setClickerPower(c => c + 1);
        setTotalSpent(s => s + nextClickerPowerPrice);
        return prev - nextClickerPowerPrice;
      }
      return prev;
    });
  }, [nextClickerPowerPrice]);

  const handleBuyGeneratorClick = useCallback(() => {
    if (canBuyGenerator) {
      setBalance(prev => prev - nextBuyGeneratorPrice);
      setGenerators(prev => [...prev, { price: 0, level: 1 }]);
      setPriceGenerator(prev => prev + 1);
      setTotalSpent(prev => prev + nextBuyGeneratorPrice);
    }
  }, [canBuyGenerator, nextBuyGeneratorPrice]);

  const handleGeneratorClick = useCallback(
    (generatorIndex: number) => {
      setGenerators(prevGens => {
        const earned = prevGens[generatorIndex].price;
        setBalance(prev => prev + earned);
        setTotalEarned(prev => prev + earned);

        const nextGenerators = Array.from(prevGens);
        nextGenerators[generatorIndex].price = 0;

        if (isGeneratorsPower) {
          nextGenerators[generatorIndex].level += 1;
          setIsGeneratorsPower(false);
        }

        return nextGenerators;
      });
    },
    [isGeneratorsPower]
  );

  const handleVibrationToggle = useCallback(() => {
    setBalance(prev => prev - Constants.VIBRATION_PRICE);
    setIsVibration(prev => !prev);
    setTotalSpent(prev => prev + Constants.VIBRATION_PRICE);
  }, []);

  const handleBuyGoldClick = useCallback(() => {
    if (canBuyGold) {
      setBalance(prev => prev - Constants.GOLD_PRICE);
      setGoldBalance(prev => prev + 1);
      setTotalSpent(prev => prev + Constants.GOLD_PRICE);
    }
  }, [canBuyGold]);

  const handleControllClick = useCallback(
    (controllId: string) => {
      if (controllId === 'generator') {
        setGenerators(prevGens => {
          let deltaBalance = 0;
          for (let i = 0; i < prevGens.length; i += 1) {
            deltaBalance += prevGens[i].price;
          }
          setBalance(prev => prev + deltaBalance);
          setTotalEarned(prev => prev + deltaBalance);
          return prevGens.map((it) => ({ ...it, price: 0 }));
        });
      }
    },
    []
  );

  const handleBuyGeneratorControllClick = useCallback(() => {
    if (canBuyGeneratorControll) {
      setBalance(prev => prev - Constants.CONTROLL_GENERATOR_PRICE);
      setControlls(prev => ({
        ...prev,
        generator: {},
      }));
      setTotalSpent(prev => prev + Constants.CONTROLL_GENERATOR_PRICE);
    }
  }, [canBuyGeneratorControll]);

  const handleBuyGeneratorPowerClick = useCallback(() => {
    if (canBuyGeneratorPower) {
      setBalance(prev => prev - nextGeneratorPowerPrice);
      setGeneratorsPower(prev => prev + 1);
      setIsGeneratorsPower(true);
      setTotalSpent(prev => prev + nextGeneratorPowerPrice);
    }
  }, [canBuyGeneratorPower, nextGeneratorPowerPrice]);

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
      setLang(savedState.lang ?? 0);
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
      lang,
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
    lang,
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
    setLang(0);
    setTotalClicks(0);
    setTotalSpent(0);
    setTotalEarned(0);
  }, [clearSave]);

  const handleLangChange = useCallback((newLang: number) => {
    setLang(newLang);
  }, []);

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
      }, 200); // Автозбереження через 2 секунди після зміни
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    balance,
    goldBalance,
    clickerPower,
    generators,
    controlls,
    isVibration,
    lang,
    totalClicks,
    totalSpent,
    totalEarned,
    isLoaded,
    // handleSaveGame НЕ включаємо, щоб уникнути циклічних залежностей
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
    lang,

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
    handleLangChange,

    // Методи збереження
    handleLoadGame,
    handleSaveGame,
    handleResetGame,
  };
};
