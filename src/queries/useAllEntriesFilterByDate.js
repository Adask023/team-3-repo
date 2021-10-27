import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const useAllEntriesFilterByDate = (date) => {
  const { data, loading, error } = useQuery(GET_ALL_ENTRIES_FILTER_BY_DATE, {
    variables: { date: date },
  });

  return { data: data && data.entryMany, loading, error };
};

export const GET_ALL_ENTRIES_FILTER_BY_DATE = gql`
  query getAllFiltered($date: Date) {
    entryMany(filter: { date: $date }) {
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

export default useAllEntriesFilterByDate;
