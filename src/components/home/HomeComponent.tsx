import React, { useState, useEffect, useCallback, FC, JSX } from "react";
import { View, Text, Vibration } from "react-native";
import { styles } from "./Style";
import Scoreboard from "../scoreboard";
import Stats from "../stats";
import Generators from "../generators";
import Controlls from "../controlls";
import { IControls } from "../../../assets/types/controlls";
import { Constants } from "../../constants";
import ButtonSkills from "../button_skills/ButtonSkills";
import ButtonLang from "../button_lang";
import { IGeneratorItem } from "../../../assets/types/generators";

const Language = [
  ["Баланс","Balance","Balance"],
  [["Cила Клікера","Генератори"],["Power Clickers","Generators"],["Power Clickers","Generatoren"]],
  [["Отримати","Швидкий Збір"],["Get","Quick Collection"],["Erhalten","Schnelle Sammlung"]],
  ["Купити Ген","Buy Gen","Kaufen Gen"],
  ["Купити Сили","Buy Power","Kaufen Power"],
  ["Швидкий Збір","Quick collection","Schnelle Sammlung"],
  ["Купити Золото","Buy gold","Kaufen Gold"],
  [["Вібрація Викл","Вібрація Вкл"],["Vibration off","Vibration on"],["Vibration aus","Vibration auf"]],
];

export const HomeComponent: FC = (): JSX.Element => {
  const [balance, setBalance] = useState<number>(0);
  const [goldBalance, setGoldBalance] = useState<number>(0);
  const [clickerPower, setClickerPower] = useState<number>(1);
  const [priceGenerator, setPriceGenerator] = useState<number>(1);
  const [generatorsPower, setGeneratorsPower] = useState<number>(1);
  const [isGeneratorsPower, setIsGeneratorsPower] = useState<boolean>(false);
  const [generators, setGenerators] = useState<IGeneratorItem[]>([]);
  const [controlls, setControlls] = useState<IControls>({});
  const [isVibration, setIsVibration] = useState<boolean>(false);
  const [lang, setLang] = useState<number>(0)

  const handleClickerClick = useCallback(() => {
    setBalance(balance + clickerPower);
  }, [balance, clickerPower, setBalance]);

  const nextClickerPowerPrice = (clickerPower + 1) * 16;
  const NEXT_GENERATOR_POWER_PRICE = (generatorsPower + 1) * 10;
  const NEXT_BUY_GENERATOR_PRICE = (priceGenerator + 1) * 5000;
  const canBuyGenerator =
    generators.length < 10 && balance >= NEXT_BUY_GENERATOR_PRICE
  const canBuyGold = balance >= Constants.GOLD_PRICE;
  const canBuyGeneratorControll =
    balance >= Constants.CONTROLL_GENERATOR_PRICE && !controlls.generator;
  const canSumGenerators = generators.some((it) => it.price > 0);
  const canBuyGeneratorPower =
    balance >= NEXT_GENERATOR_POWER_PRICE && generators.length > 0 ;

  const handleBuyClickerPower = useCallback(() => {
    if (balance >= nextClickerPowerPrice) {
      setBalance(balance - nextClickerPowerPrice);
      setClickerPower(clickerPower + 1);
    }
  }, [balance]);

  const handleBuyGeneratorClick = useCallback(() => {
    if (canBuyGenerator) {
      setBalance(balance - NEXT_BUY_GENERATOR_PRICE);
      setGenerators([...generators, { price: 0, level: 1 }]);
      setPriceGenerator(priceGenerator + 1);
    }
  }, [balance, priceGenerator, generators, setBalance, setGenerators, setPriceGenerator]);

  const handleChengeLangClick = useCallback(() => {
    if(lang < 2){
      setLang(lang + 1)
    }else{
      setLang(0)
    }
  }, [lang]);

  const handleGeneratorClick = useCallback(
    (generatorIndex: number) => {
      setBalance(balance + generators[generatorIndex].price);
      const nextGenerators = Array.from(generators);
      nextGenerators[generatorIndex].price = 0;
      setGenerators(nextGenerators);
      if(isGeneratorsPower&&nextGenerators[generatorIndex].level < 25){
      const nextLvlGenerators = Array.from(generators);
      nextGenerators[generatorIndex].level += 1;
      setGenerators(nextLvlGenerators);
      setIsGeneratorsPower(false)
    }
    },
    [generators, balance, setBalance, setGenerators]
  );
  const hendleVibrationOn = useCallback(() => {
    setBalance(balance - Constants.VIBRATION_PRICE);
    setIsVibration(!isVibration);
  }, [balance, isVibration]);

  const handleBuyGoldClick = useCallback(() => {
    if (canBuyGold) {
      setBalance(balance - Constants.GOLD_PRICE);
      setGoldBalance(goldBalance + 1);
    }
  }, [balance, goldBalance, canBuyGold]);

  const handleControllClick = useCallback(
    (controllId: string) => {
      if (controllId === "generator") {
        let deltaBalance = 0;
        for (let i = 0; i < generators.length; i += 1) {
          deltaBalance += generators[i].price;
        }
        setBalance(balance + deltaBalance);
        setGenerators(generators.map((it) => ({ ...it, price: 0 })));
      }
    },
    [balance, generators, setBalance, setGenerators]
  );

  const handleBuyGeneratorControllClick = useCallback(() => {
    if (canBuyGeneratorControll) {
      setBalance(balance - Constants.CONTROLL_GENERATOR_PRICE);
      setControlls({
        ...controlls,
        generator: {},
      });
    }
  }, [balance, controlls, setBalance, setControlls, canBuyGeneratorControll]);

  const handleBuyGeneratorPowerClick = useCallback(() => {
    if (canBuyGeneratorPower) {
      setBalance(balance - NEXT_GENERATOR_POWER_PRICE);
      setGeneratorsPower(generatorsPower + 1);
      setIsGeneratorsPower(true);
    }
  }, [
    canBuyGeneratorPower,
    generatorsPower,
    balance,
    NEXT_GENERATOR_POWER_PRICE,
  ]);

   useEffect(() => {
     const timer = setInterval(() => {
       if (generators.length > 0) {
         const nextGenerators = generators.map((it) => {
           const newPrice = it.price + (it.level * 2);
           return {
             ...it,
             price: newPrice > 999 ? 999 : newPrice,
           };
         });
         setGenerators(nextGenerators);
       }
     }, Constants.GENERATORS_DELAY_MS);
     return () => clearInterval(timer);
   }, [generators, generatorsPower]);

  useEffect(() => {
    if (isVibration) {
      Vibration.vibrate(1);
    }
  }, [balance, isVibration]);

  return (
    <View style={styles.App}>
      <View style={styles.score_wrapper}><ButtonLang
            onPress={handleChengeLangClick}
            constants={lang}
          /> 
        <View style={styles.score_title}>
          <Text style={styles.titleText}>{Language[0][lang]}</Text>          
        </View>
        <Scoreboard goldBalance={goldBalance} balance={balance} />
      </View>
      <View style={styles.score_components}>
        <Stats
          clickerPower={clickerPower}
          generatorsCount={generators.length}
          titleOne={Language[1][lang][0]}
          titleTwo={Language[1][lang][1]}        />
        <Controlls
          controlls={controlls}
          clickerPower={clickerPower}
          onClickerClick={handleClickerClick}
          onControllClick={handleControllClick}
          canSumGenerators={canSumGenerators}
          titleOne={Language[2][lang][0]}
          titleTwo={Language[2][lang][1]}
        />
        <View style={styles.generators_wrapper}>
          <Generators
            generators={generators}
            handleClick={handleGeneratorClick}
          />
        </View>
      </View>
      <View style={styles.content_wrapper}>
        <View style={styles.content_wrapper_item}>
          <ButtonSkills
            onPress={handleBuyGeneratorPowerClick}
            disabled={!canBuyGeneratorPower||isGeneratorsPower}
            constants={NEXT_GENERATOR_POWER_PRICE}
            title={ `${Language[3][lang]} +1 Lvl`}
          />

          <ButtonSkills
            onPress={handleBuyClickerPower}
            disabled={balance <= nextClickerPowerPrice}
            constants={nextClickerPowerPrice}
            title={`${Language[4][lang]} +1`}
          />
        </View>
        <View style={styles.content_wrapper_item}>
          <ButtonSkills
            onPress={handleBuyGeneratorClick}
            disabled={!canBuyGenerator}
            constants={NEXT_BUY_GENERATOR_PRICE}
            title={`${Language[3][lang]}`}
          />
          <ButtonSkills
            onPress={handleBuyGeneratorControllClick}
            disabled={!canBuyGeneratorControll}
            constants={Constants.CONTROLL_GENERATOR_PRICE}
            title={`${Language[5][lang]}`}
          />
        </View>
        <View style={styles.content_wrapper_item}>
          <ButtonSkills
            onPress={handleBuyGoldClick}
            disabled={!canBuyGold}
            constants={Constants.GOLD_PRICE}
            title={`${Language[6][lang]}`}
          />
          <ButtonSkills
            onPress={hendleVibrationOn}
            disabled={balance <= Constants.VIBRATION_PRICE}
            constants={Constants.VIBRATION_PRICE}
            title={`${isVibration ? `${Language[7][lang][0]}` : `${Language[7][lang][1]}`}`}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeComponent;
