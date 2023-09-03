import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  generators: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
  },
  generator_item: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "rgba(79, 168, 82, 1)",
    margin: 3,
    fontSize: 18,
    fontWeight: 500,
    padding: 3,
    borderRadius: 5,
  },
  generator_item_level: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 2,
  },
  titleText: {
    fontSize: 14,
    fontFamily: "orbitron-regular",
  },
});
