import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
    height: "100%",
    fontFamily: theme.fonts.main,
  },
});

const TextInput = ({ style, /*error,*/ ...props }) => {
  const textInputStyle = [style, styles.inputStyle];

  return (
    <NativeTextInput
      style={textInputStyle.concat(styles.inputStyle)}
      {...props}
    />
  );
};

export default TextInput;
