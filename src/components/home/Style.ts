import { StyleSheet } from "react-native";

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
    fontSize: 26,
    fontWeight: 500,
    color: "rgba(0,0,0,0.6)",
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
    width: "84%",
    height: "50%",
    backgroundColor: "yellow",
  },

  content_wrapper: {
    flex: 0.4,
    width: "auto",
    height: "auto",
  },
  content_wrapper_item: {
    display: "flex",
    flexDirection: "row",
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
    disabled: {
      backgroundColor: "green",
    },
  },
});
