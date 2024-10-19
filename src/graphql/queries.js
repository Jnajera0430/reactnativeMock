import { gql } from "apollo-boost";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
  query repositoryByID($id: ID!) {
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
      reviews {
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
          }
        }
      }
    }
  }
`;

export const GET_USER = gql`
  {
    me {
      id
      username
    }
  }
`;
