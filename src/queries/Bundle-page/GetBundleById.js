import gql from "graphql-tag";

export const GET_BUNDLE_BY_ID = gql`
  query getBundle($bundleSetId: MongoID!) {
    tagBundleById(_id: $bundleSetId) {
      name
      description
      creatorId
      tags {
        name
        _id
      }
    }
  }
`;
