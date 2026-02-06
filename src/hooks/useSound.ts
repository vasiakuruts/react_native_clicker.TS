import { useEffect, useState, useCallback } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SOUND_SETTINGS_KEY = '@clicker_sound_settings';

// Placeholder для звуків - замініть на реальні файли
const SOUNDS = {
  // click: require('../../assets/sounds/click.mp3'),
  // purchase: require('../../assets/sounds/purchase.mp3'),
  // background: require('../../assets/sounds/background.mp3'),
};

export interface SoundSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  soundVolume: number; // 0-1
  musicVolume: number; // 0-1
}

const DEFAULT_SETTINGS: SoundSettings = {
  soundEnabled: true,
  musicEnabled: true,
  soundVolume: 0.7,
  musicVolume: 0.3,
};

export const useSound = () => {
  const [settings, setSettings] = useState<SoundSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState<Audio.Sound | null>(null);
  const [clickSound, setClickSound] = useState<Audio.Sound | null>(null);
  const [purchaseSound, setPurchaseSound] = useState<Audio.Sound | null>(null);

  // Завантаження налаштувань
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const saved = await AsyncStorage.getItem(SOUND_SETTINGS_KEY);
        if (saved) {
          setSettings(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Помилка завантаження налаштувань звуку:', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadSettings();
  }, []);

  // Збереження налаштувань
  const saveSettings = useCallback(async (newSettings: SoundSettings) => {
    try {
      await AsyncStorage.setItem(SOUND_SETTINGS_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (e) {
      console.error('Помилка збереження налаштувань звуку:', e);
    }
  }, []);

  // Ініціалізація аудіо
  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });

        // Завантаження звуків (якщо файли існують)
        // Розкоментуйте, коли додасте реальні файли
        /*
        const { sound: click } = await Audio.Sound.createAsync(
          SOUNDS.click,
          { volume: settings.soundVolume }
        );
        setClickSound(click);

        const { sound: purchase } = await Audio.Sound.createAsync(
          SOUNDS.purchase,
          { volume: settings.soundVolume }
        );
        setPurchaseSound(purchase);

        const { sound: bg } = await Audio.Sound.createAsync(
          SOUNDS.background,
          { volume: settings.musicVolume, isLooping: true }
        );
        setBackgroundMusic(bg);

        if (settings.musicEnabled) {
          await bg.playAsync();
        }
        */
      } catch (e) {
        console.log('Звукові файли не знайдено. Додайте файли в assets/sounds/');
      }
    };

    if (isLoaded) {
      setupAudio();
    }

    return () => {
      // Очищення
      backgroundMusic?.unloadAsync();
      clickSound?.unloadAsync();
      purchaseSound?.unloadAsync();
    };
  }, [isLoaded]);

  // Відтворення звуку кліку
  const playClickSound = useCallback(async () => {
    if (!settings.soundEnabled || !clickSound) {
      // console.log('🔊 Click sound (disabled or not loaded)');
      return;
    }
    try {
      await clickSound.replayAsync();
    } catch (e) {
      console.error('Помилка відтворення звуку кліку:', e);
    }
  }, [settings.soundEnabled, clickSound]);

  // Відтворення звуку покупки
  const playPurchaseSound = useCallback(async () => {
    if (!settings.soundEnabled || !purchaseSound) {
      // console.log('🔊 Purchase sound (disabled or not loaded)');
      return;
    }
    try {
      await purchaseSound.replayAsync();
    } catch (e) {
      console.error('Помилка відтворення звуку покупки:', e);
    }
  }, [settings.soundEnabled, purchaseSound]);

  // Керування фоновою музикою
  const toggleMusic = useCallback(async (enabled: boolean) => {
    const newSettings = { ...settings, musicEnabled: enabled };
    await saveSettings(newSettings);

    if (backgroundMusic) {
      if (enabled) {
        await backgroundMusic.playAsync();
      } else {
        await backgroundMusic.pauseAsync();
      }
    }
  }, [settings, backgroundMusic, saveSettings]);

  // Зміна гучності звуків
  const setSoundVolume = useCallback(async (volume: number) => {
    const newSettings = { ...settings, soundVolume: volume };
    await saveSettings(newSettings);

    if (clickSound) await clickSound.setVolumeAsync(volume);
    if (purchaseSound) await purchaseSound.setVolumeAsync(volume);
  }, [settings, clickSound, purchaseSound, saveSettings]);

  // Зміна гучності музики
  const setMusicVolume = useCallback(async (volume: number) => {
    const newSettings = { ...settings, musicVolume: volume };
    await saveSettings(newSettings);

    if (backgroundMusic) await backgroundMusic.setVolumeAsync(volume);
  }, [settings, backgroundMusic, saveSettings]);

  // Увімкнення/вимкнення звуків
  const toggleSound = useCallback(async (enabled: boolean) => {
    const newSettings = { ...settings, soundEnabled: enabled };
    await saveSettings(newSettings);
  }, [settings, saveSettings]);

  return {
    settings,
    playClickSound,
    playPurchaseSound,
    toggleMusic,
    toggleSound,
    setSoundVolume,
    setMusicVolume,
    saveSettings,
    isLoaded,
  };
};
