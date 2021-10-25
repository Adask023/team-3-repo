import { gql } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import useAllBundles from "../../queries/useAllBundles";
import AddBundlePopUp from "./bundle/AddBundlePopUp";

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
  const [isPopUpActive, setPopUpActive] = useState(false);
  // const [userId, setUserId] = useState("61671921b7efc009eaf79450");
  // console.log(data);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  // example data structure singleBundle._id
  return (
    <div>
      <div>
        {!isPopUpActive && (
          <button onClick={() => setPopUpActive(true)}>ADD NEW BUNDLE</button>
        )}

        {isPopUpActive && <AddBundlePopUp setPopUpActive={setPopUpActive} />}
      </div>
      <h1>Bundles list:</h1>
      {data.tagBundleMany.map(({ _id, name }) => {
        return (
          <div key={_id}>
            <Link to={`/bundle/${_id}`}>
              <h3>{name}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Bundles;