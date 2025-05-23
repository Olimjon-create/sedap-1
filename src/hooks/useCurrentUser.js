import React from "react";
import { useState } from "react";
import useFetchApiItems from "./useFetchApiItems";

function useCurrentUser() {
  const [user, setUser] = useState(null);
  if (typeof window !== "undefined") {
    setUser(localStorage.getItem("user"));
    setUser(user ? JSON.parse(user) : null);
  }

  if (!user) {
    return null;
  }

  const [restaurants, isresLoading, refetchres] = useFetchApiItems(
    `/restaurants?filters[users][documentId][$eqi]=${user.documentId}`
  );

  const foundRestaurant = restaurants[0] ?? null;
  if (!foundRestaurant) {
    return null;
  }

  return {
    ...user,
    restaurant: foundRestaurant,
  };
}

export default useCurrentUser;
