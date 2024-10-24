import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useSignup = () => {
  const [mutate] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.error(error);
      console.log({ error });

      // console.error(error.graphQLErrors[0].message);
    },
  });
  const singUp = async (user) => {
    const { data } = await mutate({
      variables: { user },
    });

    if (!data) {
      return null;
    }

    return data;
  };

  return { singUp };
};

export default useSignup;
