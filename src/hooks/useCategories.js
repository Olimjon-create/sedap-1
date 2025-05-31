// get all

import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import useCurrentUser from "./useCurrentUser";

export default function useCategories() {
  const user = useCurrentUser();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/categories?filters[restaurant][documentId][$eq]=${user.restaurantId}`)
        .then((response) => {
          setCategories(response.data.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [user]);

  const handleDeleteCategory = (catId) => {
    console.log("datatattt", catId);
    if (catId) {
      axiosInstance
        .delete(`/categories/${catId}`)
        .then((response) => {
          console.log("detele", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  const refetch = () => {
    axiosInstance
      .get(`/categories?filters[restaurant][documentId][$eq]=${user.restaurantId}`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // pending
  // fullfilled
  // rejected

  // promise handle
  // async await ❌
  // .then ✅

  const handleCreateCategory = (data) => {
    if (data.restaurantId) {
      const values = {
        data: {
          name: data.name,
          description: data.description,
          internalName: `olim ${data.name}`,
          restaurant: user?.restaurantId,
        },
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };

      fetch("http://192.168.100.109:1337/api/categories", options)
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleUpdate = () => {};
  return [categories, refetch, handleDeleteCategory, handleCreateCategory];
}
