import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const useUpdateEntry = () => {
  const [updateEntry, { data, loading, error }] = useMutation(UPDATE_ENTRY);
  return [updateEntry, { data, loading, error }];
};

export const UPDATE_ENTRY = gql`
  mutation updateEntryById($entryId: ID!, $record: EntryCreateTypeInput) {
    updateEntry(_id: $entryId, record: $record) {
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

export default useUpdateEntry;
