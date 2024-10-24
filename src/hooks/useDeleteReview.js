import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.error(error);
      console.log({ error });

      // console.error(error.graphQLErrors[0].message);
    },
  });

  const deleteReview = async (id) => {
    const { data } = await mutate({
      variables: {
        deleteReviewId: id,
      },
    });

    return data.deleteReview;
  };

  return { deleteReview };
};

export default useDeleteReview;
