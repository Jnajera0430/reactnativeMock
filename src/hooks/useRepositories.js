import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { loading, data, refetch, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      // pollInterval: 2000,
      fetchPolicy: "cache-and-network",
      variables,
      onError: (e) => {
        console.log({ e });
      },
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data && !loading ? data.repositories : null,
    loading,
    refetch,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
