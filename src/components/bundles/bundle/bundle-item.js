import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const GET_BUNDLE_BY_ID = gql`
  query getBundle($bundleSetId: MongoID) {
    tagBundleById(_id: $bundleSetId) {
      name
      description
      tags {
        name
        _id
      }
    }
  }
`;

// "61719b8df1bb107cb9040d1f"

// NOTATKI: popsuty request do naprawy + dodanie zmiennych!

// _id: $id

// , {
//     variables: {
//       id: _id
//     },
//   }

function BundleItem() {
  let { _id } = useParams();
  console.log(_id);
  const { data, loading, error } = useQuery(GET_BUNDLE_BY_ID, {
    variables: { bundleSetId: "61719b8df1bb107cb9040d1f" },
  });

  //   const { data, loading, error } = getBundleById({
  //     variables: {
  //       _id: _id
  //     },
  //   });

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  console.log(data);
  console.log(data.tagBundleById.name);

  const tags = data.tagBundleById.tags.map(({ name, _id }) => {
    return <li key={_id}>{name}</li>;
  });
  console.log(data.tagBundleById.tags[0].name);

  return (
    <div>
      <Link to="/">
        <button>Back</button>
      </Link>
      <br />
      bundle id: {_id}
      <br />
      One bundle with all tags:
      <ul>{tags}</ul>
    </div>
  );
}

export default BundleItem;
