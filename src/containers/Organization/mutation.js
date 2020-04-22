import gql from "graphql-tag";

export const ORGANIZATION_REMOVE_MUTATION = gql`
  mutation OrganizationRemove($id: id!) {
    result: OrganizationRemove(id: $id) {
      id
    }
  }
`;
