import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {
  const { data, loading, fetchMore, refetch, ...result } = useQuery(
    GET_REPOSITORY,
    {
      // pollInterval: 2000,
      fetchPolicy: "cache-and-network",
      variables,
    }
  );

  const getRepository = async (id) => {
    if (id) {
      await refetch({ id });
    }
  };

  const handleFetchMore = (id) => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        ...variables,
        after: data.repository.reviews.pageInfo.endCursor,
        id,
      },
    });
  };

  return {
    repository: data && !loading ? data.repository : null,
    getRepository,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepository;
