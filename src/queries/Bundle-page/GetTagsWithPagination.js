import gql from "graphql-tag";

export const GET_TAGS_WITH_PAGINATION = gql`
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
