import { useApolloClient, useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import useAuthStorage from "./useAuthStorage";

const useUserLogged = () => {
  const { loading, data, refetch } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
  });

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  if (!data) {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return {
    user: data ? data.me : null,
    loading,
    refetch,
  };
};

export default useUserLogged;
