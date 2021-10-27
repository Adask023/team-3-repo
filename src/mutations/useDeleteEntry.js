import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { GET_ALL_ENTRIES_FILTER_BY_DATE } from "../queries/useAllEntriesFilterByDate";

const useDeleteEntry = () => {
  const [deleteEntry, { data, loading, error }] = useMutation(
    ENTRY_REMOVE_BY_ID,
    {
      refetchQueries: [GET_ALL_ENTRIES_FILTER_BY_DATE, "getAllFiltered"],
    }
  );
  return [deleteEntry, { data, loading, error }];
};

export const ENTRY_REMOVE_BY_ID = gql`
  mutation deleteEntry($entryId: MongoID!) {
    entryRemoveById(_id: $entryId) {
      recordId
    }
  }
`;

export default useDeleteEntry;
