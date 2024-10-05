import React from "react";
import { StyleSheet, View } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";

const styles = StyleSheet.create({
  errorText: {
    color: "#d73a4a",
    height: 20,
  },
  containerInput: {
    width: "100%",
    height: 50,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    gap: 5,
    display: "flex",
    flexDirection: "column",
  },
  inputStyle: {},
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <View
        style={{
          ...styles.containerInput,
          borderColor: !showError ? "#b9b9b9" : "#d73a4a",
        }}
      >
        <TextInput
          onChangeText={(value) => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          {...props}
        />
      </View>
      <Text fontWeight='bold' style={styles.errorText}>
        {showError && meta.error}
      </Text>
    </>
  );
};

export default FormikTextInput;
