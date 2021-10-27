import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { GET_ALL_ENTRIES_FILTER_BY_DATE } from "../queries/useAllEntriesFilterByDate";

const useCreateNewEntry = () => {
  const [addEntry, { data, loading, error }] = useMutation(CREATE_NEW_ENTRY, {
    refetchQueries: [GET_ALL_ENTRIES_FILTER_BY_DATE, "getAllFiltered"],
  });
  return [addEntry, { data, loading, error }];
};

export const CREATE_NEW_ENTRY = gql`
  mutation createNewEntry($record: EntryCreateTypeInput) {
    createEntry(record: $record) {
      _id
      startTime
      endTime
      createdAt
      order
      tag {
        name
        tagBundle {
          name
        }
      }
    }
  }
`;

export default useCreateNewEntry;
