import { useQuery } from "@apollo/react-hooks";
import { useState, useCallback } from "react";
import _get from 'lodash/get';
import { PATIENT_LIST_QUERY } from "./query";

interface ISearchResult<T> {
  data?: T;
  error: any;
  loading: boolean;
}

export interface IPatient {
  id: string;
  gender: string;
  active: boolean | null;
  birthDate: string | null;
  resourceType: "Patient";
}

export const useSearch = () => {
  const [variables, setVariable] = useState({
    limit: 20,
    page: 1,
  });

  const { data, loading, error } = useQuery<ISearchResult<IPatient>>(PATIENT_LIST_QUERY, {
    variables,
    fetchPolicy: "cache-first",
  });

  console.log('error:', error);

  const total = _get(data, 'PatientList.total', 0);
  const page = _get(data, 'PatientList.page', 0);
  const pageSize = _get(data, 'PatientList.pageSize', 0);
  const list = _get(data, 'PatientList.entry', []).map((({ resource }: { resource: IPatient }) => resource));

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
