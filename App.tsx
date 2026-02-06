import {
  StyleSheet,
  ImageBackground,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  Animated,
} from "react-native";
import HomeComponent from "./src/components/home/HomeComponent";
import MainMenu from "./src/components/main-menu/MainMenu";
import Settings from "./src/components/settings/Settings";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState, useEffect, useRef } from "react";
import { useSound } from "./src/hooks/useSound";

SplashScreen.preventAutoHideAsync();

const image = {
  uri: "https://abrakadabra.fun/uploads/posts/2022-01/1642919410_4-abrakadabra-fun-p-odnotonnie-oboi-dlya-telefona-android-7.jpg",
};

type Screen = 'menu' | 'game' | 'settings';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [shouldLoadGame, setShouldLoadGame] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Звуки на рівні всього додатку
  const soundContext = useSound();

  const [fontsLoaded, fontError] = useFonts({
    "orbitron-bold": require("./assets/fonts/Orbitron-Bold.ttf"),
    "orbitron-regular": require("./assets/fonts/Orbitron-Regular.ttf"),
  });

  // Fade анімація при зміні екрану
  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentScreen]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const handleNewGame = () => {
    setShouldLoadGame(false);
    setCurrentScreen('game');
  };

  const handleContinueGame = () => {
    setShouldLoadGame(true);
    setCurrentScreen('game');
  };

  const handleResetGame = () => {
    setShouldLoadGame(false);
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  const handleOpenSettings = () => {
    setCurrentScreen('settings');
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Animated.View style={{ flex: 1, width: '100%', opacity: fadeAnim }}>
            {currentScreen === 'menu' ? (
              <MainMenu
                onNewGame={handleNewGame}
                onContinueGame={handleContinueGame}
                onResetGame={handleResetGame}
                onSettings={handleOpenSettings}
              />
            ) : currentScreen === 'settings' ? (
              <Settings
                onBack={handleBackToMenu}
                soundContext={soundContext}
              />
            ) : (
              <HomeComponent
                shouldLoadGame={shouldLoadGame}
                onBackToMenu={handleBackToMenu}
                playClickSound={soundContext.playClickSound}
                playPurchaseSound={soundContext.playPurchaseSound}
              />
            )}
          </Animated.View>
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
