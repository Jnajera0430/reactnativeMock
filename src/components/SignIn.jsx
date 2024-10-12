import React from "react";
import Text from "./Text";
import { StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";
import { TouchableOpacity } from "react-native";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be most or equal to 5")
    .required("Password is required"),
});

const style = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "white",
  },
  containerButonStyle: {
    width: "100%",
    height: 50,
    backgroundColor: theme.colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    color: "white",
  },
});

const initialValues = { username: "", password: "" };
const SignInForm = ({ onSubmit }) => {
  return (
    <View style={style.container}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput
        name='password'
        placeholder='Password'
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={onSubmit} style={style.containerButonStyle}>
        <Text fontWeight='bold' style={style.buttonStyle}>
          Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      if (data) {
        navigate("//");
      }
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
