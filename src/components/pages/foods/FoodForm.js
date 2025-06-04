import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { axiosInstance } from "@/utils/axiosInstance";

export default function Foods() {
  const [search, setSearch] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    }
  }, []);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (user?.documentId) {
        try {
          const res = await axiosInstance.get(
            `/restaurants?filters[users][documentId][$eqi]=${user.documentId}`
          );
          const found = res.data?.data?.[0] ?? null;
          setRestaurant(found);
        } catch (error) {
          console.error("Restoran olishda xato:", error);
        }
      }
    };
    fetchRestaurant();
  }, [user]);

  const fetchFoods = async () => {
    if (restaurant?.documentId) {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(
          `/foods?filters[restaurant][documentId][$eqi]=${restaurant.documentId}&populate[type][populate][0]=category`
        );
        setFoods(res.data?.data || []);
      } catch (error) {
        console.error("Foods olishda xato:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (restaurant?.documentId) {
      fetchFoods();
    }
  }, [restaurant]);

  useEffect(() => {
    const result = search
      ? foods.filter((item) =>
          item.name?.toLowerCase().includes(search.toLowerCase())
        )
      : foods;
    setFilteredFoods(result);
  }, [search, foods]);

  const handleClick = () => router.push("/foods/new");

  const handleDelete = async (foodId) => {
    try {
      const res = await fetch(
        `http://192.168.100.114:1337/api/foods/${foodId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        fetchFoods();
        console.error("Delete failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAction = (action, documentId) => {
    if (action === "View") router.push(`/foods/${documentId}`);
    else if (action === "Edit") router.push(`/foods/${documentId}/edit`);
    else if (action === "Delete") handleDelete(documentId);
  };

  const image = (item) => {
    const img = item?.image || "";
    return img.startsWith("http") || img.endsWith(".jpg") ? img : "/trash.png";
  };

  return (
    <>
      {/* <div style={{ padding: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "20px",
          }}
        />
        <button onClick={handleClick}>Yangi food qo‘shish</button>
      </div> */}

      {isLoading ? (
        <p style={{ textAlign: "center" }}>Yuklanmoqda...</p>
      ) : filteredFoods.length > 0 ? (
        <div
          style={{
            maxWidth: "1460px",
            padding: "40px 20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
          }}
        >
          {filteredFoods.map((item) => (
            <div
              key={item.id}
              style={{
                width: "276px",
                minHeight: "340px",
                borderRadius: "14px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                position: "relative",
                paddingTop: "100px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "160px",
                  height: "160px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginTop: "15px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <Image
                  width={160}
                  height={160}
                  src={image(item)}
                  alt={item.name}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    fontWeight: "700",
                    fontSize: "18px",
                    marginTop: "10px",
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    color: "#00B074",
                    fontSize: "14px",
                    marginBottom: "20px",
                  }}
                >
                  {item.type?.category?.name} / {item.type?.name}
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {Array.isArray(icons) &&
                    icons.map((icon) => (
                      <div
                        key={icon.id}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <button
                          style={{
                            border: "none",
                            borderRadius: "12px",
                            backgroundColor: "#00B0741A",
                            padding: "8px",
                          }}
                          onClick={() =>
                            handleAction(icon.name, item.documentId)
                          }
                        >
                          <Image
                            src={icon.img}
                            alt={icon.name}
                            width={24}
                            height={24}
                          />
                        </button>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#5E6E89",
                            fontWeight: "500",
                          }}
                        >
                          {icon.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>Food topilmadi!</h1>
      )}
    </>
  );
}
