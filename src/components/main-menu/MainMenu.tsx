import React, { FC, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from './Style';
import { useLanguage } from '../../hooks/useLanguage';
import { useGameStorage } from '../../hooks/useGameStorage';
import ButtonLang from '../button_lang';

interface MainMenuProps {
  onNewGame: () => void;
  onContinueGame: () => void;
  onResetGame: () => void;
  onSettings: () => void;
}

export const MainMenu: FC<MainMenuProps> = ({
  onNewGame,
  onContinueGame,
  onResetGame,
  onSettings,
}) => {
  const { lang, changeLang, getText } = useLanguage();
  const { checkSaveExists, loadGame } = useGameStorage();
  const [hasSave, setHasSave] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  // Статистика
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [totalEarned, setTotalEarned] = useState<number>(0);

  useEffect(() => {
    const checkSave = async () => {
      const exists = await checkSaveExists();
      setHasSave(exists);
    };
    checkSave();
  }, [checkSaveExists]);

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
  }, [loadGame, hasSave]);

  const handleResetClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmReset = () => {
    setShowConfirm(false);
    onResetGame();
    setHasSave(false);
  };

  const handleCancelReset = () => {
    setShowConfirm(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 40, right: 20 }}>
        <ButtonLang onPress={changeLang} constants={lang} />
      </View>

      <Text style={styles.title}>{getText('menuTitle')}</Text>
      {!hasSave ? 
        <TouchableOpacity
        style={styles.menuButton}
        onPress={onNewGame}
        activeOpacity={0.8}
      >
        <Text style={styles.menuButtonText}>{getText('newGame')}</Text>
      </TouchableOpacity>
      
:
      <TouchableOpacity
        style={[
          styles.menuButton,
          !hasSave && styles.menuButtonDisabled,
        ]}
        onPress={hasSave ? onContinueGame : undefined}
        activeOpacity={hasSave ? 0.8 : 1}
        disabled={!hasSave}
      >
        <Text style={styles.menuButtonText}>{getText('continueGame')}</Text>
      </TouchableOpacity>}
      {hasSave ? 
        <TouchableOpacity
        style={styles.menuButton}
        onPress={onNewGame}
        activeOpacity={0.8}
      >
        <Text style={styles.menuButtonText}>{getText('newGame')}</Text>
      </TouchableOpacity>
      
:
      <TouchableOpacity
        style={[
          styles.menuButton,
          !hasSave && styles.menuButtonDisabled,
        ]}
        onPress={hasSave ? onContinueGame : undefined}
        activeOpacity={hasSave ? 0.8 : 1}
        disabled={!hasSave}
      >
        <Text style={styles.menuButtonText}>{getText('continueGame')}</Text>
      </TouchableOpacity>}

      <TouchableOpacity
        style={[styles.menuButton, styles.menuButtonSettings]}
        onPress={onSettings}
        activeOpacity={0.8}
      >
        <Text style={styles.menuButtonText}>{getText('settings')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuButton,
          styles.menuButtonDanger,
          !hasSave && styles.menuButtonDisabled,
        ]}
        onPress={hasSave ? handleResetClick : undefined}
        activeOpacity={hasSave ? 0.8 : 1}
        disabled={!hasSave}
      >
        <Text style={styles.menuButtonText}>{getText('resetGame')}</Text>
      </TouchableOpacity>

      {/* Статистика */}
      {hasSave && (
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
      )}

      <Modal
        visible={showConfirm}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelReset}
      >
        <View style={styles.confirmContainer}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>{getText('confirmReset')}</Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={[styles.confirmButton, styles.confirmButtonYes]}
                onPress={handleConfirmReset}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmButtonText}>{getText('yes')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton, styles.confirmButtonNo]}
                onPress={handleCancelReset}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmButtonText}>{getText('no')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MainMenu;
