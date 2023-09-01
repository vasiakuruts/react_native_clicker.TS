import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scoreboard: {
    width: "100%",
    height: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  scoreboard_row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },

  scoreboard_label: {
    fontSize: 36,
    color: "rgba(0,0,0,0.6)",
    padding: 5,
  },

  scoreboard_cell: {
    display: "flex",
    width: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: 900,
    backgroundColor: "rgba(228, 245, 237, 1)",
    color: "rgba(0,0,0,0.6)",
    margin: 4,
  },
});
