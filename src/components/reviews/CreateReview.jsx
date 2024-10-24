import { Formik } from "formik";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import * as yup from "yup";
import Text from "../utils/Text";
import theme from "../../theme";
import FormikTextInput from "../utils/FormikTextInput";
import useReview from "../../hooks/useReview";
import { useNavigate } from "react-router-native";
const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number().required("Rating is required").min(0).max(100),
  text: yup.string(),
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

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={style.container}>
      <FormikTextInput name='ownerName' placeholder='Repository owner name' />
      <FormikTextInput name='repositoryName' placeholder='Repository name' />
      <FormikTextInput
        name='rating'
        placeholder='Rating between in 0 and 100'
        keyboardType='numeric'
      />
      <FormikTextInput name='text' placeholder='Review' multiline={true} />
      <TouchableOpacity onPress={onSubmit} style={style.containerButonStyle}>
        <Text fontWeight='bold' style={style.buttonStyle}>
          Create a review
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
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};
const CreateReview = () => {
  const { createReview } = useReview();
  const navigate = useNavigate();
  const onSubmit = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const result = await createReview({
        ownerName,
        repositoryName,
        rating: Number.parseInt(rating),
        text,
      });

      if (result) {
        navigate(`/${result.repositoryId}`);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return <ManageFormmik onSubmit={onSubmit} />;
};

export default CreateReview;
