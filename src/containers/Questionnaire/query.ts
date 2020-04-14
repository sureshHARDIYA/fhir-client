import gql from "graphql-tag";

export const QUESTIONNAIRE_LIST_QUERY = gql`
  query QuestionnaireList($limit: Int, $page: Int) {
    result: QuestionnaireList(limit: $limit, page: $page) {
      total
      page
      pageSize
      totalPage

      entry {
        resource {
          ...on Questionnaire {
            id
            resourceType
            url
            title
            date
            purpose
          }
        }
      }
    }
  }
`;
