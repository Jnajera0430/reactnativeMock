import { gql } from "apollo-boost";

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          fullName
          id
          description
          forksCount
          language
          ownerAvatarUrl
          openIssuesCount
          ratingAverage
          reviewCount
          ownerName
          name
          watchersCount
          stargazersCount
        }
      }
      totalCount
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repositoryByID($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      url
      description
      forksCount
      language
      ownerAvatarUrl
      openIssuesCount
      ratingAverage
      reviewCount
      ownerName
      name
      watchersCount
      stargazersCount
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              fullName
            }
            user {
              id
              username
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          startCursor
          hasPreviousPage
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getCurrentUser(
    $includeReviews: Boolean = false
    $first: Int
    $after: String
  ) {
    me {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repository {
              id
              fullName
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;
