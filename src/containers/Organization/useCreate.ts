import { useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ORGANIZATION_CREATE_MUTATION } from './mutation';
import { notification } from "antd";
import { useHistory } from "react-router-dom";

export const useCreate = () => {
  const history = useHistory();
  const [submit] = useMutation(ORGANIZATION_CREATE_MUTATION);

  const onCreate = useCallback(async (resource) => {
    try {
      console.log('resource:', resource);
      await submit({
        variables: {
          resource: {
            ...resource,
            active: !!resource.active,
            resourceType: 'Organization',
          },
        },
        refetchQueries: ["ORGANIZATION_LIST_QUERY"],
      });
      notification.success({
        message: 'Organization',
        description: 'Organization is created successful!',
      });
      history.push('/organizations');
    } catch (e) {
      console.error(e.toString());
      notification.error({
        message: 'Organization',
        description: e.toString(),
      });
    }
  }, []);

  return {
    onCreate,
  };
};
