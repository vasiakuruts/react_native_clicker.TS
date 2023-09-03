import { Platform, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  App: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },

  score_wrapper: {
    flex: 0.25,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(188, 224, 208, 1)",
  },

  score_title: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    paddingTop: 10,
    fontSize: 26,
    fontFamily: "orbitron-bold",
  },

  score_components: {
    flex: 0.4,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  generators_wrapper: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "50%",
  },

  content_wrapper: {
    flex: 0.4,
    width: "auto",
    height: "auto",
  },
  content_wrapper_item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  button: {
    width: 150,
    height: 70,
    borderRadius: 20,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 18,
    margin: 4,
  },
});
