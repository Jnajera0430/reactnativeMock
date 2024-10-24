import { useApolloClient, useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import useAuthStorage from "./useAuthStorage";

const useUserLogged = (variables) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { loading, data, refetch, fetchMore, ...result } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
    variables,
    onError: (e) => {
      console.log({ e });
      console.error(e);
    },
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.me.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_USER,
      variables: {
        ...variables,
        after: data.me.reviews.pageInfo.endCursor,
      },
    });
  };

  if (!data && !loading) {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return {
    user: data ? data.me : null,
    loading,
    refetch,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useUserLogged;
