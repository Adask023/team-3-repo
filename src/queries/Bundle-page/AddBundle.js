import { gql } from "@apollo/client";
export const ADD_BUNDLE = gql`
  mutation createClient($record: CreateOneTagBundleInput!) {
    tagBundleCreateOne(record: $record) {
      recordId
    }
  }
`;
