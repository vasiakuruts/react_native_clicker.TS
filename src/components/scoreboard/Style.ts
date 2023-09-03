import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scoreboard: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },

  scoreboard_row: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0,
    marginRight: 0,
  },

  scoreboard_label: {
    fontSize: 36,
    color: "rgba(0,0,0,0.6)",
    padding: 5,
    fontFamily: "orbitron-regular",
  },

  scoreboard_cell: {
    width: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: 900,
    backgroundColor: "rgba(228, 245, 237, 1)",
    color: "rgba(0,0,0,0.6)",
  },
  titleText: {
    fontSize: 28,
    fontFamily: "orbitron-regular",
  },
});
