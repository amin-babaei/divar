import { useCallback } from "react";

export const createQueryString = (searchParams) => {
    const create = useCallback(
        (name, value) => {
          const params = new URLSearchParams(searchParams);
          params.set(name, value);
          return params.toString();
        },
        [searchParams]);
    return create
}