import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import UserInfoContext from "../../context/UserInfoContext";

export const Settings = () => {
  const GET_ALL_ENTRIES = gql`
    query GetAllEntries {
      tagBundleMany {
        _id
        name
        creatorId
      }
    }
  `;
  const { data } = useQuery(GET_ALL_ENTRIES);
  const [renderedData, setRenderedData] = useState();
  const [filterChecked, setFilterCheck] = useState();
  // if (loading) return <div className="">Loading...</div>;
  // if (error) return <div className="">Error: </div>;
  useEffect(() => {
    let filteredData = data?.tagBundleMany.filter((val, id, self) => {
      return id === self.findIndex((el) => el.name === val.name);
    });
    setRenderedData(filteredData);
    setFilterCheck(filteredData);
  }, [data]);
  const handleCompany = (e, item) => {
    if (e.target.checked) {
      console.log("checked");
      setFilterCheck((prev) => [...prev, item]);
    }
    if (!e.target.checked) {
      console.log("unchecked");
      setFilterCheck(filterChecked.filter((company) => company !== item));
    }
  };
  console.log(filterChecked);
  console.log(UserInfoContext.value);
  return (
    <div className="options">
      {renderedData?.map((item) => {
        return (
          <div className="options-box" key={item._id}>
            <span className="options-span">
              <input
                className="options-input"
                type="checkbox"
                name="checkbox"
                defaultChecked={true}
                id={item._id}
                onChange={(e) => ((item) => handleCompany(e, item))(item)}
              />
              {item.name}
            </span>
            <br />
          </div>
        );
      })}
    </div>
  );
};
