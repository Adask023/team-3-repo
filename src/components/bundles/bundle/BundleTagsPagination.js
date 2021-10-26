import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

const GET_TAGS_WITH_PAGINATION = gql`
  query getPagination($bundleId: MongoID, $page: Int) {
    tagPagination(
      filter: { tagBundleId: $bundleId }
      page: $page
      perPage: 10
    ) {
      pageInfo {
        pageCount
        itemCount
        hasNextPage
        hasPreviousPage
        currentPage
      }
      items {
        name
        _id
      }
      count
    }
  }
`;

// TO DO OPTIONAL
// component przy zmianie przycisków renderuje się dwukrotnie, jak starczy czasy to spróbować to zoptymalizować

function BundleTagsPagination({ _id }) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const { data, loading, error } = useQuery(GET_TAGS_WITH_PAGINATION, {
    variables: { bundleId: _id, page: currentPageNumber },
  });

  // USE EFFECT ------------------------------------
  useEffect(() => {
    if (!loading && data) {
      setCurrentPageNumber(data.tagPagination.pageInfo.currentPage);
    }
  }, [loading, data]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  // CONSOLE LOG ------------------------------------
  console.log(data);
  console.log(currentPageNumber);

  const { count, items, pageInfo } = data.tagPagination;

  const tagsToDisplay = items.map((item) => {
    return <li key={item._id}>{item.name}</li>;
  });

  const handlePageChange = (direction) => {
    if (direction === "up" && pageInfo.hasNextPage) {
      setCurrentPageNumber(currentPageNumber + 1);
    } else if (direction === "down" && pageInfo.hasPreviousPage) {
      setCurrentPageNumber(currentPageNumber - 1);
    } else if (direction > 0) {
      setCurrentPageNumber(direction);
    } else {
      alert("error");
    }
  };

  const renderPaginationButtons = (max) => {
    let buttonArr = [];

    for (let i = 1; i <= max; i++) {
      buttonArr.push(
        <button
          style={{
            backgroundColor:
              i == data.tagPagination.pageInfo.currentPage ? "red" : "",
          }}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    console.log(buttonArr);
    return buttonArr;
  };

  return (
    <div>
      Hi im pagination ID: {_id}
      <h1>total tags: {count}</h1>
      <ul>{tagsToDisplay}</ul>
      <button
        disabled={!pageInfo.hasPreviousPage}
        onClick={() => handlePageChange("down")}
      >
        ­←
      </button>
      {renderPaginationButtons(pageInfo.pageCount)}
      <button
        disabled={!pageInfo.hasNextPage}
        onClick={() => handlePageChange("up")}
      >
        →
      </button>
    </div>
  );
}

export default BundleTagsPagination;