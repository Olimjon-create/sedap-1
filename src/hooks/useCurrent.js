import { useEffect, useState } from "react";
import useFetchApiItem from "./useFetchApiItem";

function useCurrent() {
  const [user, setUser] = useState(null);

  const [restaurants] = useFetchApiItem(
    "/restaurants",
    user && {
      filters: {
        users: {
          documentId: user.documentId,
        },
        key: "users",
      },
    }
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          ...parsedUser,
          restaurants,
        });
      }
    }
  }, [restaurants]);
  //   user.test = "s";
  return user;
}

export default useCurrent;
