import React, { useState, useEffect, useCallback, FC } from "react";
import { View, Text, Vibration } from "react-native";
import { styles } from "./Style";
import Scoreboard from "../scoreboard";
import Stats from "../stats";
import Generators from "../generators";
import Controlls from "../controlls";
import { IControls } from "../../../assets/types/controlls";
import { Constants } from "../../constants";
import ButtonSkills from "../button_skills/ButtonSkills";

export const HomeComponent: FC = (): JSX.Element => {
  const [balance, setBalance] = useState<number>(0);
  const [goldBalance, setGoldBalance] = useState<number>(0);
  const [clickerPower, setClickerPower] = useState<number>(1);
  const [generatorsPower, setGeneratorsPower] = useState<number>(1);
  const [generators, setGenerators] = useState<number[]>([]);
  const [controlls, setControlls] = useState<IControls>({});
  const [isVibration, setIsVibration] = useState<boolean>(false);

  const handleClickerClick = useCallback(() => {
    setBalance(balance + clickerPower);
  }, [balance, clickerPower, setBalance]);

  const nextClickerPowerPrice = (clickerPower + 1) * 16;
  const NEXT_GENERATOR_POWER_PRICE = (generatorsPower + 1) * 10;
  const canBuyGenerator =
    generators.length < 10 && balance >= Constants.GENERATOR_PRICE;
  const canBuyGold = balance >= Constants.GOLD_PRICE;
  const canBuyGeneratorControll =
    balance >= Constants.CONTROLL_GENERATOR_PRICE && !controlls.generator;
  const canSumGenerators = generators.some((it) => it > 0);
  const canBuyGeneratorPower =
    balance >= NEXT_GENERATOR_POWER_PRICE && generatorsPower < 11;

  const handleBuyClickerPower = useCallback(() => {
    if (balance >= nextClickerPowerPrice) {
      setBalance(balance - nextClickerPowerPrice);
      setClickerPower(clickerPower + 1);
    }
  }, [balance]);

  const handleBuyGeneratorClick = useCallback(() => {
    if (canBuyGenerator) {
      setBalance(balance - Constants.GENERATOR_PRICE);
      setGenerators([...generators, 1]);
    }
  }, [generators]);

  const handleGeneratorClick = useCallback(
    (generatorIndex: number) => {
      setBalance(balance + generators[generatorIndex]);
      const nextGenerators = Array.from(generators);
      nextGenerators[generatorIndex] = 0;
      setGenerators(nextGenerators);
    },
    [generators]
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
          deltaBalance += generators[i];
        }
        setBalance(balance + deltaBalance);
        setGenerators(generators.map(() => 0));
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
    }
  }, [
    canBuyGeneratorPower,
    generatorsPower,
    balance,
    NEXT_GENERATOR_POWER_PRICE,
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (generators) {
        const nextGenerators = generators.map((it) => {
          if (it + 1 > 999) {
            return 999;
          }
          return it + generatorsPower;
        });
        setGenerators(nextGenerators);
      }
    }, Constants.GENERATORS_DELAY_MS);
    return () => clearTimeout(timer);
  }, [generators, generatorsPower]);

  useEffect(() => {
    if (isVibration) {
      Vibration.vibrate(1);
    }
  }, [balance, isVibration]);

  return (
    <View style={styles.App}>
      <View style={styles.score_wrapper}>
        <View style={styles.score_title}>
          <Text style={styles.titleText}>Balance</Text>
        </View>
        <Scoreboard goldBalance={goldBalance} balance={balance} />
      </View>
      <View style={styles.score_components}>
        <Stats
          clickerPower={clickerPower}
          generatorsCount={generators.length}
        />
        <Controlls
          controlls={controlls}
          clickerPower={clickerPower}
          onClickerClick={handleClickerClick}
          onControllClick={handleControllClick}
          canSumGenerators={canSumGenerators}
        />
        <View style={styles.generators_wrapper}>
          <Generators
            generators={generators}
            generatorsPower={generatorsPower}
            handleClick={handleGeneratorClick}
          />
        </View>
      </View>
      <View style={styles.content_wrapper}>
        <View style={styles.content_wrapper_item}>
          <ButtonSkills
            onPress={handleBuyGeneratorPowerClick}
            disabled={!canBuyGeneratorPower}
            constants={NEXT_GENERATOR_POWER_PRICE}
            title={"Buy gen +1 Lvl"}
          />

          <ButtonSkills
            onPress={handleBuyClickerPower}
            disabled={balance <= nextClickerPowerPrice}
            constants={nextClickerPowerPrice}
            title={"Buy power +1"}
          />
        </View>
        <View style={styles.content_wrapper_item}>
          <ButtonSkills
            onPress={handleBuyGeneratorClick}
            disabled={!canBuyGenerator}
            constants={Constants.GENERATOR_PRICE}
            title={"Buy gen"}
          />
          <ButtonSkills
            onPress={handleBuyGeneratorControllClick}
            disabled={!canBuyGeneratorControll}
            constants={Constants.CONTROLL_GENERATOR_PRICE}
            title={"Quick collection"}
          />
        </View>
        <View style={styles.content_wrapper_item}>
          <ButtonSkills
            onPress={handleBuyGoldClick}
            disabled={!canBuyGold}
            constants={Constants.GOLD_PRICE}
            title={"Buy gold"}
          />
          <ButtonSkills
            onPress={hendleVibrationOn}
            disabled={balance <= Constants.VIBRATION_PRICE}
            constants={Constants.VIBRATION_PRICE}
            title={`${isVibration ? "Vibration off" : "Vibration on"}`}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeComponent;
