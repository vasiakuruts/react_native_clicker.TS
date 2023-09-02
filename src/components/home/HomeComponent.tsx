import React, { useState, useEffect, useCallback, FC } from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./Style";
import Scoreboard from "../scoreboard";
import Stats from "../stats";
import Generators from "../generators";
import Controlls from "../controlls";
import { IControls } from "../../../.expo/types/controlls";

const GENERATOR_PRICE = 2;
const CONTROLL_GENERATOR_PRICE = 2;
const GENERATORS_DELAY_MS = 5000;
const GOLD_PRICE = 10000;

export const HomeComponent: FC = (): JSX.Element => {
  const [balance, setBalance] = useState<number>(50);
  const [goldBalance, setGoldBalance] = useState<number>(0);
  const [clickerPower, setClickerPower] = useState<number>(1);
  const [generatorsPower, setGeneratorsPower] = useState<number>(1);
  const [generators, setGenerators] = useState<number[]>([]);
  const [controlls, setControlls] = useState<IControls>({});

  const handleClickerClick = useCallback(() => {
    setBalance(balance + clickerPower);
  }, [balance, clickerPower, setBalance]);

  const nextClickerPowerPrice = (clickerPower + 1) * 16;
  const NEXT_GENERATOR_POWER_PRICE = (generatorsPower + 1) * 1;
  const canBuyGenerator = generators.length < 10 && balance >= GENERATOR_PRICE;
  const canBuyGold = balance >= GOLD_PRICE;
  const canBuyGeneratorControll =
    balance >= CONTROLL_GENERATOR_PRICE && !controlls.generator;
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
      setBalance(balance - GENERATOR_PRICE);
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

  const handleBuyGoldClick = useCallback(() => {
    if (canBuyGold) {
      setBalance(balance - GOLD_PRICE);
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
      setBalance(balance - CONTROLL_GENERATOR_PRICE);
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
    }, GENERATORS_DELAY_MS);
    return () => clearTimeout(timer);
  }, [generators, generatorsPower]);

  return (
    <View style={styles.App}>
      <View style={styles.score_wrapper}>
        <View style={styles.score_title}>
          <Text>Balance</Text>
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
          <Pressable
            onPress={handleBuyGoldClick}
            disabled={!canBuyGold}
            style={styles.button}
          >
            <Text>
              Купити золото {"\n"} (${GOLD_PRICE})
            </Text>
          </Pressable>
          <Pressable
            onPress={handleBuyClickerPower}
            disabled={balance <= nextClickerPowerPrice}
            style={styles.button}
          >
            <Text>
              Купити силу +1 {"\n"} (${nextClickerPowerPrice})
            </Text>
          </Pressable>
        </View>
        <View style={styles.content_wrapper_item}>
          <Pressable
            onPress={handleBuyGeneratorClick}
            disabled={!canBuyGenerator}
            style={styles.button}
          >
            <Text>
              Купити Генератор {"\n"} (${GENERATOR_PRICE})
            </Text>
          </Pressable>
          <Pressable
            onPress={handleBuyGeneratorControllClick}
            disabled={!canBuyGeneratorControll}
            style={styles.button}
          >
            <Text>
              Купити Управління генератором {"\n"} (${CONTROLL_GENERATOR_PRICE})
            </Text>
          </Pressable>
        </View>
        <View style={styles.content_wrapper_item}>
          <Pressable
            onPress={handleBuyGeneratorPowerClick}
            disabled={!canBuyGeneratorPower}
            style={styles.button}
          >
            <Text>
              Buy Generator +1 {"\n"} (${NEXT_GENERATOR_POWER_PRICE})
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HomeComponent;
