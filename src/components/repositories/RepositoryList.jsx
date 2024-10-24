import { FlatList, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import useRepository from "../../hooks/useRepository";
import { useEffect, useState } from "react";
import { useParams } from "react-router-native";
import SingleRepository from "./SingleRepository ";
import Select from "../utils/Select";
import SearchComponent from "../utils/Search";
import { useDebounce } from "use-debounce";
const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
});

//Ahora este componente no es muy puro.
export const RepositoryListContainer = ({
  repositories,
  setSelectedFilter,
  onEndReach,
}) => {
  const { id } = useParams();
  const { getRepository, repository, fetchMore } = useRepository({ first: 2 });
  const [valueSelect, setValueSelect] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchKeyword] = useDebounce(searchValue, 1000);

  const handleSelectFilter = (itemValue) => {
    setValueSelect(itemValue);
    if (itemValue === "highestRatedRepositories") {
      setSelectedFilter({
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      });
    }
    if (itemValue === "lowestRatedRepositories") {
      setSelectedFilter({
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      });
    }
    if (itemValue === "latestRepositories") {
      setSelectedFilter({ orderBy: "CREATED_AT", orderDirection: "DESC" });
    }
  };

  const onEndReachRepository = () => {
    if (id) {
      fetchMore(id);
    }
  };

  useEffect(() => {
    if (id) {
      getRepository(id);
    }
  }, [id]);
  useEffect(() => {
    setSelectedFilter({ searchKeyword });
  }, [searchKeyword]);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return id ? (
    <SingleRepository
      repository={repository}
      isViewItem={id !== undefined}
      onEndReach={onEndReachRepository}
    />
  ) : (
    <FlatList
      style={style.container}
      data={repositoryNodes}
      renderItem={({ item }) => (
        <RepositoryItem repository={item} isViewItem={id !== undefined} />
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={{ padding: 10 }}>
          <SearchComponent
            handleSetSearchValue={setSearchValue}
            searchValue={searchValue}
          />
          <Select
            handleSelectFilter={handleSelectFilter}
            valueSelect={valueSelect}
          />
        </View>
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      scrollEnabled={true}
    />
  );
};

//una tecnica para volver un componente pure
const RepositoryList = () => {
  const [filters, setFilters] = useState({ first: 2 });
  const { repositories, fetchMore } = useRepositories(filters);
  const onEndReach = () => {
    fetchMore();
  };

  const handleFilters = (newFilters) => {
    setFilters((state) => ({ ...state, ...newFilters }));
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedFilter={filters}
      setSelectedFilter={handleFilters}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
