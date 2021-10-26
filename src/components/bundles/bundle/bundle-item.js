import { gql, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

// import UserInfoContext from "../../../context/UserInfoContext";
import UserInfoContext from "../../../context/UserInfoContext";
import BundleTagsPagination from "./BundleTagsPagination";
import Description from "./Description";

const GET_BUNDLE_BY_ID = gql`
  query getBundle($bundleSetId: MongoID!) {
    tagBundleById(_id: $bundleSetId) {
      name
      description
      creatorId
      tags {
        name
        _id
      }
    }
  }
`;

function BundleItem() {
  let { _id } = useParams();

  const { userInfo } = useContext(UserInfoContext);

  // console.log(_id);
  const { data, loading, error } = useQuery(GET_BUNDLE_BY_ID, {
    variables: { bundleSetId: _id },
  });
  console.log(userInfo);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  const { description, creatorId } = data.tagBundleById;

  // const tagsToDisplay = tags.map(({ name, _id }) => {
  //   return (
  //     <li key={_id}>
  //       {name} id: {_id}
  //     </li>
  //   );
  // });
  // console.log(data.tagBundleById.tags[0].name);

  return (
    <div>
      <Link to="/bundle">
        <button>Back</button>
      </Link>
      <br />
      bundle id: {_id}
      <br />
      Creator id: {creatorId}
      <br />
      <h2>Description</h2>
      <div>{description}</div>
      <Description _id={_id} creatorId={creatorId} description={description} />
      <br />
      <BundleTagsPagination _id={_id} />
    </div>
  );
}

export default BundleItem;
