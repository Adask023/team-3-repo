import gql from "graphql-tag";

export const LOGIN = gql`
  query getData {
    getProfile {
      oauthId
      tagBundlesIds
      tagBundles {
        _id
        description
        creatorId
        updatedAt
        createdAt
        name
        tags {
          name
          _id
          tagBundleId
        }
      }
    }
  }
`;
