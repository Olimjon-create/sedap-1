<<<<<<< HEAD
import { useEffect, useState } from "react";

export default function useCurrentUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let user1 = localStorage.getItem("user");
      user1 = user1 ? JSON.parse(user1) : null;

      if (!user) {
        setUser(user1);
      }
      // restauratId;
    }
  }, []);

  return user;
}
=======
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
>>>>>>> 95028bcbd473c4981aa9e5fc045d0ff3668b73d5
