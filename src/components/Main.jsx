import React, { useCallback, useEffect, useState } from "react";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import RepositoryList from "./repositories/RepositoryList";
import { View } from "react-native";
import AppBar from "./AppBar";
import { NativeRouter, Route, Routes } from "react-router-native";
import SignIn from "./auth/SignIn";
import BodyMassIndexCalculator from "./BodyMassIndexForm";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ApolloProvider } from "@apollo/react-hooks";
import createApolloClient from "../utils/apolloClient";
import AuthStorage from "../utils/authStorage";
import AuthStorageContext from "../context/AuthStorageContext";
import CreateReview from "./reviews/CreateReview";
import Signup from "./auth/Signup";
import Reviews from "./reviews/Reviews";

SplashScreen.preventAutoHideAsync();
const loadFonts = async () => {
  await Font.loadAsync({
    Sansserif: require("../../assets/fonts/OpenSans.ttf"),
    Roboto: require("../../assets/fonts/Roboto.ttf"),
    Arial: require("../../assets/fonts/Arial.ttf"),
  });
};

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

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
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <View style={styles.container} onLayout={onLayoutRootView}>
            <AppBar />
            <View style={styles.containerRoutes}>
              <Routes>
                <Route path='/' Component={RepositoryList} />
                <Route path='/:id' Component={RepositoryList} />
                <Route path='/signin' Component={SignIn} />
                <Route path='/signup' Component={Signup} />
                <Route path='/createreview' Component={CreateReview} />
                <Route path='/form' Component={BodyMassIndexCalculator} />
                <Route path='/reviews' Component={Reviews} />
              </Routes>
            </View>
          </View>
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default Main;
