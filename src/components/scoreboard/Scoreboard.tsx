import React from "react";
import { Text, View } from "react-native";
import { styles } from "./Style";
import { IScoreboardProps } from "../../../.expo/types/scoreboard";

function pad(num: number, size: number) {
  var s = "000000000" + num;
  const str = s.substring(s.length - size);
  return str.split("");
}

function renderCells(label: string, score: string[]) {
  const rows = score.map((it, index) => (
    <View key={`scoreChunk${index}`} style={styles.scoreboard_cell}>
      <Text>{it}</Text>
    </View>
  ));
  return (
    <View style={styles.scoreboard_row}>
      <Text style={styles.scoreboard_label}>{label}</Text>
      <Text>{rows}</Text>
    </View>
  );
}

export default function Scoreboard(props: IScoreboardProps) {
  const { balance, goldBalance } = props;
  const goldCells = pad(goldBalance, 6);
  const balanceCells = pad(balance, 9);
  return (
    <View style={styles.scoreboard}>
      <Text>{renderCells("G", goldCells)}</Text>
      <Text>{renderCells("$", balanceCells)}</Text>
    </View>
  );
}
