import { gql } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

import useAllBundles from "../../queries/useAllBundles";

const GET_ALL_BUNDLES = gql`
  query GetAllBundles {
    tagBundleMany {
      _id
      name
      creatorId
    }
  }
`;

const Bundles = () => {
  const { data, loading, error } = useAllBundles(GET_ALL_BUNDLES);
  console.log(data);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  // example data structure singleBundle._id
  return (
    <div>
      <h1>Bundles list:</h1>
      {data.tagBundleMany.map(({ _id, name }) => {
        return (
          <div key={_id}>
            <Link to={`/bundle/${_id}`}>
              <h3>{name}</h3> id: {_id}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Bundles;
