import { useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ORGANIZATION_REMOVE_MUTATION } from './mutation';
import { notification } from "antd";

export const useDelete = () => {
  const [submit] = useMutation(ORGANIZATION_REMOVE_MUTATION);

  const onDelete = useCallback(async (id) => {
    try {
      await submit({
        variables: { id },
        refetchQueries: ["ORGANIZATION_LIST_QUERY"],
      });
      notification.success({
        message: 'Organization',
        description: 'Organization is deleted successful!',
      });
    } catch (e) {
      console.error(e.toString());
      notification.error({
        message: 'Organization',
        description: e.toString(),
      });
    }
  }, []);

  return {
    onDelete,
  };
};