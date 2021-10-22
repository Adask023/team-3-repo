import React, { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { GET_ALL_ENTRIES } from "../../queries/useAllEntries";

const CREATE_NEW_ENTRY = gql`
mutation CreateEntry($record: EntryCreateTypeInput) {
    createEntry(record: $record){
      _id
      startTime
      endTime
      tag{
        name
      }
    }
  }`

const NewEntry = () => {
    const [newEntryValue, setNewEntryValue] = useState();
    const [createEntry] = useMutation(CREATE_NEW_ENTRY, 
        {refetchQueries: 
            [GET_ALL_ENTRIES, "GetAllEntries"]
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newEntryValue);
        createEntry({
            variables: {
                record: {
                    tagBundleName: "111",
                    tagName: newEntryValue
                }
            }
        });
        setNewEntryValue("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={newEntryValue} onChange={(event) => setNewEntryValue(event.target.value)} />
            <button>ADD ENTRY</button>
        </form>
    )
}

export default NewEntry;