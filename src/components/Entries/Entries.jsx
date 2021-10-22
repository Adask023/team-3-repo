import React from "react";
import { gql, useQuery } from "@apollo/client"

const GET_ALL_ENTRIES = gql`
query GetAllEntries {
	entryMany {
    startTime
    endTime
    tag {
      name
    }
  }
}`

const Entries = () => {
    const values = useQuery(GET_ALL_ENTRIES);
    console.log(values.data);
    return( 
        <div>
            {values.data?.entryMany.map((singleEntry) => {
                return (
                    <div>
                        <span>startTime: {singleEntry.startTime}</span>
                        <span>endTime: {singleEntry.endTime}</span>
                        <span>name: {singleEntry.tag?.name}</span>
                    </div>
                )
            })}
        </div>)
}

export default Entries;