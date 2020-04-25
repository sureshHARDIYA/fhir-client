import gql from "graphql-tag";

export const ORGANIZATION_REMOVE_MUTATION = gql`
  mutation OrganizationRemove($id: id!) {
    result: OrganizationRemove(id: $id) {
      id
    }
  }
`;

export const ORGANIZATION_CREATE_MUTATION = gql`
  mutation OrganizationCreate($id: id, $resource: Organization_Input!) {
    result: OrganizationCreate(id: $id, resource: $resource) {
      id
    }
  }
`;
