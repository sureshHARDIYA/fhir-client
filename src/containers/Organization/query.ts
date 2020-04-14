import gql from "graphql-tag";

export const ORGANIZATION_LIST_QUERY = gql`
  query OrganizationList($limit: Int, $page: Int) {
    result: OrganizationList(limit: $limit, page: $page) {
      total
      page
      pageSize
      totalPage

      entry {
        resource {
          ...on Organization {
            id
            active
            resourceType
            name
            address {
              text
              country
            }
          }
        }
      }
    }
  }
`;
