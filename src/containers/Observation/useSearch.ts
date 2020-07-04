import _get from "lodash/get";
import { notification } from "antd";
import { OBSERVATION_LIST_QUERY } from "./query";
import { useState, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";

interface ISearchResult<T> {
  data?: T;
  error: any;
  loading: boolean;
}

export interface IObservation {
  id: string;
  status?: string;
  resourceType: "Observation";
}

export const useSearch = () => {
  const [variables, setVariable] = useState({
    limit: 20,
    page: 1
  });

  const { data, loading, error } = useQuery<ISearchResult<IObservation>>(
    OBSERVATION_LIST_QUERY,
    {
      variables,
      fetchPolicy: "cache-first"
    }
  );

  if (!loading && error) {
    notification.error({ message: error.toString() });
  }

  const page = _get(data, "result.page", 0);
  const total = _get(data, "result.total", 0);
  const list = _get(data, "result.entry", []).map(
    ({ resource }: { resource: IObservation }) => resource
  );
  const pageSize = _get(data, "result.pageSize", variables.limit);

  const onChange = useCallback(
    (pageNumber: number) =>
      setVariable(pre => ({
        ...pre,
        page: pageNumber
      })),
    []
  );

  const onPageSize = useCallback(
    (_: number, pageSizeNumber: number) =>
      setVariable(pre => ({
        ...pre,
        page: 1,
        limit: pageSizeNumber
      })),
    []
  );

  return {
    list,
    total,
    loading,
    current: page,
    pageSize,
    onChange,
    onPageSize
  };
};
