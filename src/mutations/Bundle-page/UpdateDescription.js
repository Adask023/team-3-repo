import gql from "graphql-tag";

export const UPDATE_DESCRIPTION = gql`
  mutation updateDescription(
    $id: MongoID!
    $record: UpdateByIdTagBundleInput!
  ) {
    tagBundleUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;
