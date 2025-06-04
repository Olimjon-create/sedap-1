import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import useCurrentUser from "./useCurrentUser";

const ROOT_PATH = "/categories";
const INTERNAL_NAME = "BehruzRes"; // internalName ni doimiy qilish

export default function useCategories() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const user = useCurrentUser();

  useEffect(() => {
    if (user?.restaurantId) {
      fetchCategories();
    }
  }, [user]);

  const fetchCategories = () => {
    setIsLoading(true);
    axiosInstance
      .get(
        `${ROOT_PATH}?filters[restaurant][documentId][$eq]=${user.restaurantId}`
      )
      .then((res) => setCategories(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  const createCategory = (data) => {
    if (!data || !user?.restaurantId) {
      console.error("Data yoki restaurantId topilmadi");
      return;
    }

    const values = {
      data: {
        name: data.name,
        description: data.description,
        internalName: INTERNAL_NAME,
        restaurant: user.restaurantId,
      },
    };

    axiosInstance
      .post(ROOT_PATH, values)
      .then((res) => {
        console.log("Success:", res.data.data);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error creating category:", error);
        setError(error);
      });
  };

  const getCategory = async (documentId) => {
    try {
      const res = await axiosInstance.get(`${ROOT_PATH}/${documentId}`);
      return res.data.data;
    } catch (err) {
      console.error("Error fetching category:", err);
      setError(err);
    }
  };

  const deleteCategory = async (documentId) => {
    try {
      await axiosInstance.delete(`${ROOT_PATH}/${documentId}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      setError(err);
    }
  };

  const updateCategory = async (data) => {
    if (!data?.documentId || !user?.restaurantId) {
      console.error("documentId yoki restaurantId topilmadi");
      return;
    }

    const values = {
      data: {
        name: data.name,
        description: data.description,
        internalName: INTERNAL_NAME,
        restaurant: data.restaurantId || user.restaurantId,
      },
    };

    axiosInstance
      .put(`${ROOT_PATH}/${data.documentId}`, values)
      .then((res) => {
        console.log("Updated:", res.data);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Xatolik:", error);
        setError(error);
      });
  };

  return [
    {
      categories,
      isLoading,
      error,
      reFetch: fetchCategories,
    },
    {
      getCategory,
      createCategory,
      updateCategory,
      deleteCategory,
    },
  ];
}
