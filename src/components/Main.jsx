import React from "react";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import RepositoryList from "./RepositoryList";
import { View } from "react-native";
import AppBar from "./AppBar";
import { NativeRouter, Route, Routes } from "react-router-native";
import SignIn from "./SignIn";
import BodyMassIndexCalculator from "./BodyMassIndexForm";
import Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
const loadFonts = async () => {
  await Font.loadAsync({
    "Sans-serif": require("../../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf"),
    Roboto: require("../../assets/fonts/Roboto.ttf"),
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

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function fetchFonts() {
      await loadFonts();
      setFontsLoaded(true);
    }

    fetchFonts();
  }, []);

  if (!fontsLoaded) {
    return <View>cargando</View>;
  }
  return (
    <NativeRouter>
      <View style={styles.container}>
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
