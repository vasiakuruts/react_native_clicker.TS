import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  generators: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255, 249, 215, 0.5)",
    padding: 10,
  },
  generator_item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 60,
    backgroundColor: "rgba(79, 168, 82, 1)",
    margin: 5,
    fontSize: 18,
    fontWeight: 500,
  },
  generator_item_level: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 4,
  },
});
