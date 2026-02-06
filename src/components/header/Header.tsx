import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ButtonLang from '../button_lang';
import Scoreboard from '../scoreboard';

interface HeaderProps {
  lang: number;
  onChangeLang: () => void;
  balanceTitle: string;
  goldBalance: number;
  balance: number;
  styles: any;
  backToMenuText?: string;
  onBackToMenu?: () => void;
}

export const Header: FC<HeaderProps> = ({
  lang,
  onChangeLang,
  balanceTitle,
  goldBalance,
  balance,
  styles,
  backToMenuText,
  onBackToMenu,
}) => {
  return (
    <View style={styles.score_wrapper}>
      <View style={headerStyles.topRow}>
        {onBackToMenu && backToMenuText && (
          <TouchableOpacity
            style={headerStyles.backButton}
            onPress={onBackToMenu}
            activeOpacity={0.7}
          >
            <Text style={headerStyles.backButtonText}>{backToMenuText}</Text>
          </TouchableOpacity>
        )}
        <View style={headerStyles.langButton}>
          <ButtonLang onPress={onChangeLang} constants={lang} />
        </View>
      </View>
      <View style={styles.score_title}>
        <Text style={styles.titleText}>{balanceTitle}</Text>
      </View>
      <Scoreboard goldBalance={goldBalance} balance={balance} />
    </View>
  );
};

const headerStyles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  backButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    borderRadius: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'orbitron-bold',
  },
  langButton: {
    marginLeft: 'auto',
  },
});

export default Header;
