import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    // pollInterval: 2000,
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: data ? data.repositories : null,
    loading,
    refetch,
  };
};

export default useRepositories;
