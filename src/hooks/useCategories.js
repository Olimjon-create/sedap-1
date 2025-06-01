import { useState, useEffect } from "react";
import { axiosInstance } from "@/utils/axiosInstance";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const reFetch = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/categories");
      setCategories(res.data.data || res.data);
    } catch (err) {
      console.error(err);
      setError("Kategoriya olishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (payload) => {
    await axiosInstance.post("/categories", { data: payload });
    await reFetch();
  };

  const updateCategory = async (id, payload) => {
    await axiosInstance.put(`/categories/${id}`, { data: payload });
    await reFetch();
  };

  const deleteCategory = async (id) => {
    await axiosInstance.delete(`/categories/${id}`);
    await reFetch();
  };

  useEffect(() => {
    reFetch();
  }, []);

  return [
    { categories, isLoading, error, reFetch },
    { createCategory, updateCategory, deleteCategory },
  ];
}
