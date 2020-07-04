import gql from "graphql-tag";

export const OBSERVATION_LIST_QUERY = gql`
  query ObservationList($limit: Int, $page: Int) {
    result: ObservationList(limit: $limit, page: $page) {
      total
      page
      pageSize
      totalPage

      entry {
        resource {
          ... on Observation {
            id
            status
            resourceType
            code {
              coding {
                system
                code
                display
              }
            }
          }
        }
      }
    }
  }
`;
