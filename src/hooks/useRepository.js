import { useLazyQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { useEffect, useState } from "react";

const useRepository = () => {
  const [repository, setRepository] = useState(null);
  const [fetch, result] = useLazyQuery(GET_REPOSITORY, {
    // pollInterval: 2000,
    fetchPolicy: "cache-and-network",
  });

  const getRepository = async (id) => {
    if (id) {
      await fetch({ variables: { id: id } });
    }
  };

  useEffect(() => {
    if (result.data) {
      setRepository(result.data.repository);
    }
  }, [result]);

  return {
    repository: repository ? repository : null,
    getRepository,
  };
};

export default useRepository;
