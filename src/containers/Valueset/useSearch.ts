import { useQuery } from "@apollo/react-hooks";
import { useState, useCallback } from "react";
import _get from 'lodash/get';
import { VALUESET_LIST_QUERY } from "./query";
import { notification } from "antd";

interface ISearchResult<T> {
  data?: T;
  error: any;
  loading: boolean;
}

export interface IValueset {
  id: string;
  url: string;
  identifier: {
    system: string;
    value: string;
  }[];
  version: string;
  name: string;
  title: string;
  status?: string;
  publisher?: string;
  description?: string;
  resourceType: "Valueset";
}

export const useSearch = () => {
  const [variables, setVariable] = useState({
    limit: 20,
    page: 1,
  });

  const { data, loading, error } = useQuery<ISearchResult<IValueset>>(VALUESET_LIST_QUERY, {
    variables,
    fetchPolicy: "cache-first",
  });

  if (!loading && error) {
    notification.error({ message: error.toString() });
  }

  const total = _get(data, 'result.total', 0);
  const page = _get(data, 'result.page', 0);
  const pageSize = _get(data, 'result.pageSize', variables.limit);
  const list = _get(data, 'result.entry', []).map((({ resource }: { resource: IValueset }) => resource));

  const onChange = useCallback((pageNumber: number) => setVariable((pre) => ({
    ...pre,
    page: pageNumber,
  })), []);

  const onPageSize = useCallback((_: number, pageSizeNumber: number) => setVariable((pre) => ({
    ...pre,
    page: 1,
    limit: pageSizeNumber,
  })), []);

  return ({
    list,
    total,
    loading,
    current: page,
    pageSize,
    onChange,
    onPageSize,
  });
};
