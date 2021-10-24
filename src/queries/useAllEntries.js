import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const useAllEntries = () => {
  const entries = useQuery(GET_ALL_ENTRIES);

  return entries;
};

export const GET_ALL_ENTRIES = gql`
  query getAllQuery {
    entryMany {
      _id
      startTime
      endTime
      tag {
        name
      }
    }
  }
`;

export default useAllEntries;
