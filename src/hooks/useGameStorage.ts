import { useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IGeneratorItem } from '../../assets/types/generators';
import { IControls } from '../../assets/types/controlls';

const STORAGE_KEY = '@clicker_game_save';

export interface GameState {
  balance: number;
  goldBalance: number;
  clickerPower: number;
  priceGenerator: number;
  generatorsPower: number;
  generators: IGeneratorItem[];
  controlls: IControls;
  isVibration: boolean;
  lang: number; // 0 - UA, 1 - EN, 2 - DE
  // Статистика
  totalClicks: number;
  totalSpent: number;
  totalEarned: number;
}

export const useGameStorage = () => {
  const saveGame = useCallback(async (gameState: GameState): Promise<boolean> => {
    try {
      const jsonValue = JSON.stringify(gameState);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      return true;
    } catch (e) {
      console.error('Помилка збереження гри:', e);
      return false;
    }
  }, []);

  const loadGame = useCallback(async (): Promise<GameState | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Помилка завантаження гри:', e);
      return null;
    }
  }, []);

  const clearSave = useCallback(async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      console.error('Помилка видалення збереження:', e);
      return false;
    }
  }, []);

  const checkSaveExists = useCallback(async (): Promise<boolean> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue !== null;
    } catch (e) {
      console.error('Помилка перевірки збереження:', e);
      return false;
    }
  }, []);

  return {
    saveGame,
    loadGame,
    clearSave,
    checkSaveExists,
  };
};
