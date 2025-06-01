import { useEffect, useState } from "react";
import useFetchApiItems from "./useFetchApiItems";

export default function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  // Step 1: Get user from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userFromStorage = localStorage.getItem("user");
      const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
      setUser(parsedUser);
    }
  }, []);

  // Step 2: Fetch restaurant for the user
  const [restaurants, isResLoading] = useFetchApiItems(
    user?.documentId
      ? `/restaurants?filters[users][documentId][$eqi]=${user.documentId}`
      : null
  );

  useEffect(() => {
    if (restaurants && restaurants.length > 0) {
      setRestaurant(restaurants[0]);
    }
  }, [restaurants]);

  if (!user) return null;

  return {
    ...user,
    restaurant,
  };
}
