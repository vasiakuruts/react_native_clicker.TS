import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  App: {
    width: "100%",
    height: 180,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  score_wrapper: {
    width: "100%",
    height: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(188, 224, 208, 1)",
  },

  score_title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 26,
    fontWeight: 500,
    color: "rgba(0,0,0,0.6)",
  },

  content_wrapper: {
    width: "87%",
    height: "60%",
  },
  content_wrapper_item: {
    display: "flex",
    width: "-80%",
    height: "-40%",
    flexDirection: "row",
  },

  button: {
    flexDirection: "column",
    width: 150,
    height: 80,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "#fff",
    fontSize: 18,
    margin: 4,
    outline: "none",
    cursor: "pointer",
  },

  "button:disabled": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});
