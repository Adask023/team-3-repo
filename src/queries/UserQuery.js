import gql from "graphql-tag";

export const LOGIN = gql`
  query getData {
    getProfile {
      _id
      oauthId
      tagBundlesIds
      tagBundles {
        name
        description
        creatorId
        updatedAt
        createdAt
      }
    }
  }
`;
