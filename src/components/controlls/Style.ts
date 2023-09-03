import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  controlls: {
    width: "100%",
    height: 120,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.03)",
    padding: 5,
  },
  controlls_button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 100,
    borderRadius: 20,
    backgroundColor: "rgba(0, 170, 113, 1)",
    color: "#fff",
    fontSize: 18,
    margin: 4,
    outline: "none",
    cursor: "pointer",
  },
});
