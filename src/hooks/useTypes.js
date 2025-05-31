import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
const ROOT_PATH = "/categories";
import useCurrentUser from "./useCurrentUser";

export default function useTypes() {
  const [isLoading, setIsLoading] = useState(true);
  const [types, setType] = useState([]);
  const [error, setError] = useState();
  const user = useCurrentUser();

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(
          `${ROOT_PATH}?filters[categories][documentId][$eq]=${user.restaurantId}`
        )
        .then((response) => {
          setType(response.data.data);
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user]);

  return [
    {
      types,
      //  isLoading,
      //  error,
      //  reFetch,
    },
    {
      //  getCategory,
      //  createCategory,
      //  updateCategory,
      //  deleteCategory,
    },
  ];
}
