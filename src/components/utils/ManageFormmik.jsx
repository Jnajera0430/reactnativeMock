import { Formik } from "formik";

const ManageFormmik = ({
  onSubmit,
  validationSchema,
  initialValues,
  children,
}) => {
  console.log({ children: typeof children });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) =>
        typeof children === "object" ? children({ handleSubmit }) : null
      }
    </Formik>
  );
};

export default ManageFormmik;
