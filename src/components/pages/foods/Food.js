import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";
import HeaderInput from "@/components/common/HeaderInput";
import { icons } from "@/data";
import { Axios } from "axios";
export default function Foods() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);

  const { user, restaurant, isLoading: userLoading } = useCurrentUser();

  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFoods = async () => {
    if (!restaurant?.documentId) return;

    setIsLoading(true);
    try {
      const res = await Axios(
        `http://192.168.100.114:1337/api/foods?filters[restaurant][documentId][$eqi]=${restaurant.documentId}&populate[type][populate][0]=category`
      );
      if (!res.ok) throw new Error("Ma'lumotlarni olishda xato yuz berdi");

      const data = await res.json();

      setFoods(data.data || []);
    } catch (error) {
      console.error("Fetch foods error:", error);
      setFoods([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [restaurant]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter((item) =>
        item.attributes.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFoods(filtered);
    }
  }, [search, foods]);

  const handleDelete = async (foodId) => {
    try {
      const res = await Axios(
        `http://192.168.100.114:1337/api/foods/${foodId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        fetchFoods();
      } else {
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
    const img = item.attributes.image || "";
    return img.startsWith("http") || img.endsWith(".jpg") ? img : "/trash.png";
  };

  if (userLoading || isLoading) {
    return <p style={{ textAlign: "center" }}>Yuklanmoqda...</p>;
  }

  return (
    <>
      <HeaderInput
        setSearch={setSearch}
        handleClick={() => router.push("/foods/new")}
      />
      {filteredFoods.length > 0 ? (
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
                  alt={item.attributes.name}
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
                  {item.attributes.name}
                </h3>
                <p
                  style={{
                    color: "#00B074",
                    fontSize: "14px",
                    marginBottom: "20px",
                  }}
                >
                  {
                    item.attributes.type?.data?.attributes.category?.data
                      ?.attributes.name
                  }{" "}
                  / {item.attributes.type?.data?.attributes.name}
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {icons.map((icon) => (
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
                          handleAction(icon.name, item.attributes.documentId)
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
