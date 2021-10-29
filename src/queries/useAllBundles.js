import { gql, useQuery } from "@apollo/client";

const GET_ALL_BUNDLES = gql`
  query GetAllBundles {
    tagBundleMany {
      _id
      name
      creatorId
    }
  }
`;

const useAllBundles = () => {
  const { data, loading, error } = useQuery(GET_ALL_BUNDLES);
  return { data: data, loading, error };
};

export default useAllBundles;
