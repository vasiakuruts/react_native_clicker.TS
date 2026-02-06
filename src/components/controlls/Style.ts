import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  controlls: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.03)",
    padding: 5,
  },
  controlls_button: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 100,
    borderRadius: 20,
    backgroundColor: "rgba(0, 170, 113, 1)",
    margin: 4,
  },
  titleText: {
    fontSize: 16,
    fontFamily: "orbitron-regular",
    color: "#fff",
  },
});
