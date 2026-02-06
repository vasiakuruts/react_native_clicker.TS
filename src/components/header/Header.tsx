import React, { FC } from 'react';
import { View, Text } from 'react-native';
import ButtonLang from '../button_lang';
import Scoreboard from '../scoreboard';

interface HeaderProps {
  lang: number;
  onChangeLang: () => void;
  balanceTitle: string;
  goldBalance: number;
  balance: number;
  styles: any;
}

export const Header: FC<HeaderProps> = ({
  lang,
  onChangeLang,
  balanceTitle,
  goldBalance,
  balance,
  styles,
}) => {
  return (
    <View style={styles.score_wrapper}>
      <ButtonLang onPress={onChangeLang} constants={lang} />
      <View style={styles.score_title}>
        <Text style={styles.titleText}>{balanceTitle}</Text>
      </View>
      <Scoreboard goldBalance={goldBalance} balance={balance} />
    </View>
  );
};

export default Header;
