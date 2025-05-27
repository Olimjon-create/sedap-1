import { useState, useEffect } from "react";
import { axiosInstance } from "@/utils/axiosInstance";

// filters: {
//   users: {
//     documentId: user?.documentId,
//   },
// },
// ?filters[users][documentId][$eqi]=user?.documentId

function useFetchApiItems(path, params) {
  const [filters, setFilters] = useState(params?.filters);
  // const [filterKey, setFilterKey] = useState(params?.filters?.key);
  const [filterKey, setFilterKey] = useState(params?.key);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isEqualFilters =
      JSON.stringify(filters) === JSON.stringify(params?.filters);
    if (!isEqualFilters) {
      setFilters(params?.filters);
    }
    const isEqualFilterKey = filterKey === params?.filters?.key;
    if (!isEqualFilterKey) {
      setFilterKey(params?.filters?.key);
    }
  }, [filterKey, filters, params]);

  const realRefetch = (path) => {
    setIsLoading(true);
    axiosInstance
      .get(path)
      .then((res) => setItems(res.data.data))
      .catch((err) => console.log("err", err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (filterKey && filters[filterKey].documentId) {
      axiosInstance
        .get(
          path +
            `?filters[${filterKey}][documentId][$eqi]=${filters[filterKey].documentId}`
        )
        .then((res) => setItems(res.data.data))
        .catch((err) => console.log("err", err))
        .finally(() => setIsLoading(false));
    }
  }, [path, count, filterKey, filters]);

  console.log("path", path, "params", params);
  return [items, isLoading, () => setCount(count + 1), realRefetch];
}

export default useFetchApiItems;
