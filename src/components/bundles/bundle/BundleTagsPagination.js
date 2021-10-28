import { gql, useQuery } from "@apollo/client";
import {
  FormControl,
  InputLabel,
  NativeSelect,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const GET_TAGS_WITH_PAGINATION = gql`
  query getPagination($bundleId: MongoID, $page: Int, $perPage: Int) {
    tagPagination(
      filter: { tagBundleId: $bundleId }
      page: $page
      perPage: $perPage
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
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [paginationLimit, setPaginationLimit] = useState(10);

  const { data, loading, error } = useQuery(GET_TAGS_WITH_PAGINATION, {
    variables: {
      bundleId: _id,
      page: currentPageNumber + 1,
      perPage: paginationLimit,
    },
  });

  // USE EFFECT ------------------------------------
  // useEffect(() => {
  //   if (!loading && data) {
  //     setCurrentPageNumber(data.tagPagination.pageInfo.currentPage - 1);
  //   }
  // }, [loading, data]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  // CONSOLE LOG ------------------------------------
  console.log(data);
  console.log(currentPageNumber);

  const { count, items, pageInfo } = data.tagPagination;

  const tagsToDisplay = items.map((item) => {
    return (
      <TableRow hover key={item._id}>
        {item.name}
      </TableRow>
    );
  });

  // const handlePageChange = (direction) => {
  //   if (direction === "up" && pageInfo.hasNextPage) {
  //     setCurrentPageNumber(currentPageNumber + 1);
  //   } else if (direction === "down" && pageInfo.hasPreviousPage) {
  //     setCurrentPageNumber(currentPageNumber - 1);
  //   } else if (direction > 0) {
  //     setCurrentPageNumber(direction);
  //   } else {
  //     alert("error");
  //   }
  // };

  // test to material ui pagination
  const handleChangePage = (event, newPage) => {
    setCurrentPageNumber(newPage);
  };

  // const renderPaginationButtons = (max) => {
  //   let buttonArr = [];

  //   for (let i = 1; i <= max; i++) {
  //     buttonArr.push(
  //       <button
  //         style={{
  //           backgroundColor:
  //             i == data.tagPagination.pageInfo.currentPage ? "red" : "",
  //         }}
  //         onClick={() => handlePageChange(i)}
  //       >
  //         {i}
  //       </button>
  //     );
  //   }
  //   console.log(buttonArr);
  //   return buttonArr;
  // };

  console.log(paginationLimit);

  const handlePaginationChange = (e) => {
    setPaginationLimit(parseInt(e.target.value));
    setCurrentPageNumber(1);
  };

  return (
    <div>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={2}>
                  Name
                </TableCell>
                {/* <TableCell align="center" colSpan={3}>
                  Details
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>{tagsToDisplay}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={handleChangePage}
          rowsPerPage={paginationLimit}
          count={count}
          component="div"
          page={currentPageNumber}
          onRowsPerPageChange={(e) => handlePaginationChange(e)}
        ></TablePagination>
      </Paper>
    </div>
  );
}

export default BundleTagsPagination;
