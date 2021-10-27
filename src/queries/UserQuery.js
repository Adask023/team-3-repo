import gql from "graphql-tag";

export const LOGIN = gql`
  query getData {
    getProfile {
      _id
      oauthId
      tagBundlesIds
      tagBundles {
        description
        creatorId
        updatedAt
        createdAt
      }
    }
  }
`;
