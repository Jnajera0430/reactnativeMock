import React, { useCallback, useEffect, useState } from "react";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import RepositoryList from "./RepositoryList";
import { View } from "react-native";
import AppBar from "./AppBar";
import { NativeRouter, Route, Routes } from "react-router-native";
import SignIn from "./SignIn";
import BodyMassIndexCalculator from "./BodyMassIndexForm";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
const loadFonts = async () => {
  await Font.loadAsync({
    Sansserif: require("../../assets/fonts/OpenSans.ttf"),
    Roboto: require("../../assets/fonts/Roboto.ttf"),
    Arial: require("../../assets/fonts/Arial.ttf"),
  });
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#b9b9b9",
    padding: 5,
    flexGrow: 1,
    flexShrink: 1,
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  containerRoutes: {
    backgroundColor: "#e1e4e8",
    flex: 1,
  },
});

const Main = () => {
  {
    /* <Text>Simple text</Text>
  <Text style={{ paddingBottom: 10 }}>Text with custom style</Text>
  <Text fontWeight='bold' fontSize='subheading'>
    Bold subheading
  </Text>
  <Text color='textSecondary'>Text with secondary color</Text>
  <FlexboxExample /> */
  }

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      await loadFonts();
      setAppIsReady(true);
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <NativeRouter>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <AppBar />
        <View style={styles.containerRoutes}>
          <Routes>
            <Route path='/' Component={RepositoryList} />
            <Route path='/signin' Component={SignIn} />
            <Route path='/form' Component={BodyMassIndexCalculator} />
          </Routes>
        </View>
      </View>
    </NativeRouter>
  );
};

export default Main;
