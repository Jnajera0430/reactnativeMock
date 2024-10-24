import { StyleSheet, View } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import TextInput from "./TextInput";
import { TouchableOpacity } from "react-native";
const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 40,
    backgroundColor: "white",
  },
});
const SearchComponent = ({ searchValue, handleSetSearchValue }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Fontisto name='search' size={15} color='#686868' />
        <TextInput
          placeholder='Search repository'
          name='search'
          style={{ flex: 1 }}
          onChangeText={(value) => handleSetSearchValue(value)}
          value={searchValue}
        />
        <TouchableOpacity
          onPress={() => {
            handleSetSearchValue("");
          }}
        >
          <Ionicons name='close' size={20} color='#686868' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchComponent;
