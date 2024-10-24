import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import * as yup from "yup";
import theme from "../../theme";
import { TouchableOpacity } from "react-native";
import Text from "../utils/Text";
import FormikTextInput from "../utils/FormikTextInput";
import useSignup from "../../hooks/useSignup";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .max(30, "Username must be less than 30 characters"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be less than 50 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
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
    borderRadius: 4,
  },
  buttonStyle: {
    color: "white",
  },
});

const initialValues = { username: "", password: "", confirmPassword: "" };

const SignupForm = ({ onSubmit }) => {
  return (
    <View style={style.container}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput
        name='password'
        placeholder='Password'
        secureTextEntry={true}
      />
      <FormikTextInput
        name='confirmPassword'
        placeholder='Password confirmation'
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={onSubmit} style={style.containerButonStyle}>
        <Text fontWeight='bold' style={style.buttonStyle}>
          Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const ManageFormmik = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignupForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const Signup = () => {
  const { singUp } = useSignup();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const result = await singUp({ username, password });

      if (result) {
        navigate(`/signin`);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return <ManageFormmik onSubmit={onSubmit} />;
};

export default Signup;
