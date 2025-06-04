import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import useCurrentUser from "./useCurrentUser";

const ROOT_PATH = "/foods";

export default function useFoods() {
  const [isLoading, setIsLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  const user = useCurrentUser();

  useEffect(() => {
    if (user?.restaurantId) {
      fetchFoods();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchFoods = () => {
    setIsLoading(true);
    axiosInstance
      .get(
        `${ROOT_PATH}?filters[restaurant][documentId][$eq]=${user.restaurantId}`
      )
      .then((response) => setFoods(response.data.data))
      .catch((error) => {
        console.error("Xatolik:", error);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  };

  const createFood = (data) => {
    if (!data || !user?.restaurantId) {
      console.error("Ma'lumotlar yoki restaurantId topilmadi");
      return;
    }

    const values = {
      data: {
        name: data.name,
        description: data.description,
        internalFoodsName: "OlimjonXamraqulovRes",
        restaurant: user.restaurantId,
      },
    };

    axiosInstance
      .post(ROOT_PATH, values)
      .then((res) => {
        console.log("Food yaratildi:", res.data.data);
        fetchFoods();
      })
      .catch((error) => {
        console.error("Food yaratishda xatolik:", error);
        setError(error);
      });
  };

  const getFood = async (documentId) => {
    try {
      const res = await axiosInstance.get(`${ROOT_PATH}/${documentId}`);
      return res.data.data;
    } catch (error) {
      console.error("Ovqat olishda xatolik:", error);
      setError(error);
      return null;
    }
  };

  const deleteFood = async (documentId) => {
    try {
      await axiosInstance.delete(`${ROOT_PATH}/${documentId}`);
      console.log("Food o'chirildi");
      fetchFoods();
    } catch (err) {
      console.error("Food o'chirishda xatolik:", err);
      setError(err);
    }
  };

  const updateFood = async (data) => {
    if (!data?.documentId || !data?.restaurantId) {
      console.error("documentId yoki restaurantId topilmadi");
      return;
    }

    const values = {
      data: {
        name: data.name,
        description: data.description,
        foodsName: "OlimjonXamraqulovRes",
        restaurant: data.restaurantId,
      },
    };

    try {
      const res = await axiosInstance.put(
        `${ROOT_PATH}/${data.documentId}`,
        values
      );
      console.log("Food yangilandi:", res.data);
      fetchFoods();
    } catch (error) {
      console.error("Food yangilashda xatolik:", error);
      setError(error);
    }
  };

  return [
    {
      foods,
      isLoading,
      error,
      reFetch: fetchFoods,
    },
    {
      getFood,
      createFood,
      updateFood,
      deleteFood,
    },
  ];
}
