import { useEffect } from "react";

import useAllEntriesFilterByDate from "../../queries/useAllEntriesFilterByDate";

export const Entries = ({ date }) => {
  const { data } = useAllEntriesFilterByDate(date);

  useEffect(() => {
    console.log(date);
  });

  return (
    <>
      {data?.map((e) => (
        <p key={e._id}>
          {e.tag.name} {e._id} {e.createdAt}
        </p>
      ))}
    </>
  );
};
