import gql from "graphql-tag";

export const LOGIN = gql`
  query getData {
    getProfile {
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
