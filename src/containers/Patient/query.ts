import gql from "graphql-tag";

export const PATIENT_LIST_QUERY = gql`
  query PatientList($limit: Int, $page: Int) {
    PatientList(limit: $limit, page: $page) {
      total
      page
      pageSize
      totalPage

      entry {
        resource {
          ...on Patient {
            id
            gender
            active
            birthDate
            resourceType
            name { family given text use }
          }
        }
      }
    }
  }
`;
