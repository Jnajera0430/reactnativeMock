import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.error(error);
      console.log({ error });

      // console.error(error.graphQLErrors[0].message);
    },
  });

  const createReview = async (review) => {
    const { data } = await mutate({
      variables: { review },
    });
    console.log({ data });

    if (!data) {
      return null;
    }

    return data.createReview;
  };

  return { createReview };
};

export default useReview;
