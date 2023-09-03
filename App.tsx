import {
  StyleSheet,
  ImageBackground,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  Text,
} from "react-native";
import HomeComponent from "./src/components/home/HomeComponent";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

const image = {
  uri: "https://abrakadabra.fun/uploads/posts/2022-01/1642919410_4-abrakadabra-fun-p-odnotonnie-oboi-dlya-telefona-android-7.jpg",
};
const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    "orbitron-bold": require("./assets/fonts/Orbitron-Bold.ttf"),
    "orbitron-regular": require("./assets/fonts/Orbitron-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <HomeComponent />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "orbitron-regular",
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
