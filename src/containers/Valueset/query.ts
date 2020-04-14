import gql from "graphql-tag";

export const VALUESET_LIST_QUERY = gql`
  query ValueSetList {
    result: ValueSetList {
      total
      page
      pageSize
      totalPage

      entry {
        resource {
          ...on ValueSet {
            id
            resourceType
            url
            identifier {
              system
              value
            }
            version
            name
            title
            status
            publisher
            description
          }
        }
      }
    }
  }
`;
