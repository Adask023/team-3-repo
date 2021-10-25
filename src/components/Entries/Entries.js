import useGetAllEntries from "../../queries/useAllEntries";

export const Entries = () => {
  const { data } = useGetAllEntries();

  return (
    <>
      {data?.entryMany.map((e) => (
        <p key={e._id}>
          {e.tag.name} {e._id}
        </p>
      ))}
    </>
  );
};
