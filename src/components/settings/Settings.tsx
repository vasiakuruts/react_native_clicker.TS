import React, { FC, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from './Style';
import { useLanguage } from '../../hooks/useLanguage';
import { useGameStorage } from '../../hooks/useGameStorage';
import ButtonLang from '../button_lang';

interface SoundContextType {
  settings: {
    soundEnabled: boolean;
    musicEnabled: boolean;
    soundVolume: number;
    musicVolume: number;
  };
  toggleSound: (enabled: boolean) => void;
  toggleMusic: (enabled: boolean) => void;
  setSoundVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
}

interface SettingsProps {
  onBack: () => void;
  soundContext: SoundContextType;
}

export const Settings: FC<SettingsProps> = ({ onBack, soundContext }) => {
  const { lang, changeLang, getText } = useLanguage();
  const { loadGame } = useGameStorage();
  const {
    settings,
    toggleSound,
    toggleMusic,
    setSoundVolume,
    setMusicVolume,
  } = soundContext;

  // Статистика
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [totalEarned, setTotalEarned] = useState<number>(0);

  // Завантаження статистики
  useEffect(() => {
    const loadStats = async () => {
      const savedState = await loadGame();
      if (savedState) {
        setTotalClicks(savedState.totalClicks || 0);
        setTotalSpent(savedState.totalSpent || 0);
        setTotalEarned(savedState.totalEarned || 0);
      }
    };
    loadStats();
  }, [loadGame]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>{getText('backToMenu')}</Text>
        </TouchableOpacity>
        <View style={styles.langButton}>
          <ButtonLang onPress={changeLang} constants={lang} />
        </View>
      </View>

      <Text style={styles.title}>{getText('settingsTitle')}</Text>

      <View style={styles.settingsContent}>
        {/* Звукові ефекти */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>{getText('soundEffects')}</Text>
          <Switch
            value={settings.soundEnabled}
            onValueChange={toggleSound}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={settings.soundEnabled ? '#4CAF50' : '#f4f3f4'}
          />
        </View>

        {/* Гучність звуків */}
        {settings.soundEnabled && (
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>
              {getText('soundVolume')}: {Math.round(settings.soundVolume * 100)}%
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={settings.soundVolume}
              onValueChange={setSoundVolume}
              minimumTrackTintColor="#4CAF50"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#4CAF50"
            />
          </View>
        )}

        {/* Фонова музика */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>{getText('backgroundMusic')}</Text>
          <Switch
            value={settings.musicEnabled}
            onValueChange={toggleMusic}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={settings.musicEnabled ? '#4CAF50' : '#f4f3f4'}
          />
        </View>

        {/* Гучність музики */}
        {settings.musicEnabled && (
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>
              {getText('musicVolume')}: {Math.round(settings.musicVolume * 100)}%
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={settings.musicVolume}
              onValueChange={setMusicVolume}
              minimumTrackTintColor="#4CAF50"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#4CAF50"
            />
          </View>
        )}

        {/* Статистика */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Статистика гри</Text>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Всього кліків:</Text>
            <Text style={styles.statValue}>{totalClicks.toLocaleString()}</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Витрачено:</Text>
            <Text style={styles.statValue}>${totalSpent.toLocaleString()}</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Зароблено:</Text>
            <Text style={styles.statValue}>${totalEarned.toLocaleString()}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Settings;
