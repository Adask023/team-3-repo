import gql from "graphql-tag";

export const GET_ALL_ENTRIES = gql`
  query GetAllEntries {
    tagBundleMany {
      _id
      name
      description
      creatorId
    }
  }
`;
export const SHOW_USER_BUNDLES = gql`
  query ShowProfile {
    getProfile {
      oauthId
      tagBundles {
        _id
        name
        description
      }
    }
  }
`;
export const ADD_USERS_BUNDLE = gql`
  mutation assignFilteredBundle($bundleId: ID) {
    assignBundleId(bundleId: $bundleId) {
      tagBundles {
        name
      }
    }
  }
`;
export const DELETE_USER_BUNDLE = gql`
  mutation UnassignFilteredBundle($bundleId: ID) {
    unassignBundleId(bundleId: $bundleId) {
      tagBundles {
        name
      }
    }
  }
`;
