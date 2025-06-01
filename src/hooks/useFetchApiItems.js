// import { useState, useEffect } from "react";
// import { axiosInstance } from "@/utils/axiosInstance";

// function serializePopulate(populate) {
//   const params = new URLSearchParams();

//   function helper(obj, prefix = "populate") {
//     Object.entries(obj).forEach(([key, val]) => {
//       if (Array.isArray(val)) {
//         val.forEach((v, i) => {
//           params.append(`${prefix}[${key}][${i}]`, v);
//         });
//       } else if (typeof val === "object" && val !== null) {
//         helper(val, `${prefix}[${key}]`);
//       }
//     });
//   }

//   helper(populate);
//   return params.toString();
// }

// function useFetchApiItems(path, params = null) {
//   const [items, setItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [count, setCount] = useState(0);

//   const stringifiedParams = JSON.stringify(params);

//   useEffect(() => {
//     if (!path) return;

//     async function fetchItems() {
//       setIsLoading(true);
//       try {
//         let url = path;

//         const parsedParams = JSON.parse(stringifiedParams);
//         const filters = parsedParams?.filters || null;
//         const filterKey = parsedParams?.key || null;
//         const populate = parsedParams?.populate || null;

//         // Filterlarni qo‘shish
//         if (filters && filterKey) {
//           const documentId = filters[filterKey]?.documentId;
//           if (documentId) {
//             url += `?filters[${filterKey}][documentId][$eqi]=${documentId}`;
//           }
//         }

//         if (populate) {
//           const populateStr = serializePopulate(populate);
//           url += url.includes("?") ? `&${populateStr}` : `?${populateStr}`;
//         }

//         const res = await axiosInstance.get(url);
//         setItems(res.data.data || []);
//       } catch (error) {
//         console.error("API fetch error:", error);
//         setItems([]);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchItems();
//   }, [path, stringifiedParams, count]);

//   const refetch = () => setCount((prev) => prev + 1);

//   return [items, isLoading, refetch];
// }

// export default useFetchApiItems;

// path get all

import { useState, useEffect } from "react";
import { axiosInstance } from "@/utils/axiosInstance";

function useFetchApiItems(path) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!path) return;
    setIsLoading(true);
    axiosInstance
      .get(path)
      .then((res) => setItems(res.data.data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setItems([]);
      })
      .finally(() => setIsLoading(false));
  }, [path, count]);

  const refetch = () => setCount((c) => c + 1);

  return [items, isLoading, refetch];
}

export default useFetchApiItems;
