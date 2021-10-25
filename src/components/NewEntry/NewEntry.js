import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";

export const NewEntry = () => {
  const [entryValue, setEntryValue] = useState("");
  const [addEntry] = useMutation(CREATE_QUERY);

  const handleSubmit = (e) => {
    e.preventDefault();
    addEntry({
      variables: {
        record: {
          tagBundleName: "111",
          tagName: entryValue,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={entryValue}
        onChange={(e) => setEntryValue(e.target.value)}
      />

      <button type="submit">SUBMIT BTN</button>
    </form>
  );
};

const CREATE_QUERY = gql`
  mutation createEntry($record: EntryCreateTypeInput) {
    createEntry(record: $record) {
      _id
      startTime
      endTime
      tag {
        name
      }
    }
  }
`;
