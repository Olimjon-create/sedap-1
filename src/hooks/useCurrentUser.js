import { useEffect, useState } from "react";

export default function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [isResLoading, setIsResLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userFromStorage = localStorage.getItem("user");
      const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    async function fetchRestaurants() {
      if (!user?.documentId) return;

      setIsResLoading(true);
      try {
        const res = await fetch(
          `/restaurants?filters[users][documentId][$eqi]=${user.documentId}`
        );
        const data = await res.json();
        if (data && data.data && data.data.length > 0) {
          setRestaurant(data.data[0]);
        } else {
          setRestaurant(null);
        }
      } catch (error) {
        console.error("Restaurant fetch error:", error);
        setRestaurant(null);
      } finally {
        setIsResLoading(false);
      }
    }

    fetchRestaurants();
  }, [user]);

  if (!user) return null;

  return {
    ...user,
    restaurant,
    isResLoading,
  };
}
