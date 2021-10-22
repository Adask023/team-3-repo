import React from "react";
import useAllEntries from "../../queries/useAllEntries";


const Entries = () => {
    const {data, loading, error} = useAllEntries();
    console.log(data);
    if (loading) return <div>loading...</div>
    if (error) return <div>Error</div>

    return( 
        <div>
            {data?.map((singleEntry) => {
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