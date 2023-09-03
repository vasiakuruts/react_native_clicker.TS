import {
  StyleSheet,
  ImageBackground,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import HomeComponent from "./src/components/home/HomeComponent";
const image = {
  uri: "https://abrakadabra.fun/uploads/posts/2022-01/1642919410_4-abrakadabra-fun-p-odnotonnie-oboi-dlya-telefona-android-7.jpg",
};

export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <HomeComponent />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
