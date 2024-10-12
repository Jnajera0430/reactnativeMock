import { gql } from "apollo-boost";

export const AUTHENTICATE_USER = gql`
  mutation authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation {
    createUser(user: { username: "myusername", password: "mypassword" }) {
      id
      username
    }
  }
`;
