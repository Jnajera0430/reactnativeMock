import { render, screen } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";
import RepositoryList from "../components/RepositoryList";

jest.mock("../hooks/useRepositories", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const repositories = {
  totalCount: 8,
  pageInfo: {
    hasNextPage: true,
    endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
  },
  edges: [
    {
      node: {
        id: "jaredpalmer.formik",
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        forksCount: 2787,
        stargazersCount: 33927,
        ratingAverage: 90,
        reviewCount: 5,
        ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
      },
      cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
    },
    {
      node: {
        id: "async-library.react-async",
        fullName: "async-library/react-async",
        description: "Flexible promise-based React data loader",
        language: "JavaScript",
        forksCount: 94,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
      },
      cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    },
  ],
};

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const useRepositories = require("../hooks/useRepositories").default;
      useRepositories.mockReturnValue({
        repositories: repositories,
      });
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <RepositoryList />
        </MockedProvider>
      );
      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      expect(firstRepositoryItem).toHaveTextContent("jaredpalmer/formik");
      expect(firstRepositoryItem).toHaveTextContent(
        "Build forms in React, without the tears"
      );
      expect(firstRepositoryItem).toHaveTextContent("TypeScript");
      expect(firstRepositoryItem).toHaveTextContent("2.7k");
      expect(firstRepositoryItem).toHaveTextContent("33.9k");
      expect(firstRepositoryItem).toHaveTextContent("90");
      expect(firstRepositoryItem).toHaveTextContent("5");

      expect(secondRepositoryItem).toHaveTextContent(
        "async-library/react-async"
      );
      expect(secondRepositoryItem).toHaveTextContent(
        "Flexible promise-based React data loader"
      );
      expect(secondRepositoryItem).toHaveTextContent("JavaScript");
      expect(secondRepositoryItem).toHaveTextContent("94");
      expect(secondRepositoryItem).toHaveTextContent("1.7k");
      expect(secondRepositoryItem).toHaveTextContent("72");
      expect(secondRepositoryItem).toHaveTextContent("3");
    });
  });
});
