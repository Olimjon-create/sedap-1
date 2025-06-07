import Head from "next/head";
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/common/layouts/MainLayout";
import PageTitle from "@/components/common/PageTitle";
import FoodsMap from "@/components/pages/foods/FoodsMap";
import FoodMapSkeleton from "@/components/pages/foods/FoodMapSkeleton";
import FoodSearch from "@/components/pages/foods/FoodSearch";
import FoodBtn from "@/components/pages/foods/FoodBtn";
import NewBtn from "@/components/pages/foods/NewBtn";
import useCurrent from "@/hooks/useCurrentUser";
import { axiosInstance } from "@/utils/axiosInstance";

export default function Foods() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selected, setSelected] = useState("left");
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const user = useCurrent();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (user?.documentId) {
        try {
          const res = await axiosInstance.get(
            `/restaurants?filters[users][documentId][$eqi]=${user.documentId}`
          );
          setRestaurant(res.data.data?.[0] || null);
        } catch (err) {
          console.error("Restoran yuklashda xato:", err);
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
        setFoods(res.data.data || []);
      } catch (err) {
        console.error("Foodsni yuklashda xato:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (restaurant && !hasFetched) {
      setHasFetched(true);
      fetchFoods();
    }
  }, [restaurant]);

  useEffect(() => {
    if (searchValue.length > 0 && foods.length > 0) {
      const filtered = foods.filter((item) => {
        const name = typeof item.name === "object" ? item.name.uz : item.name;
        return name?.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods([]);
    }
  }, [searchValue, foods]);

  return (
    <>
      <Head>
        <title>Foods</title>
      </Head>

      <div style={{ padding: "24px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <PageTitle
            title="Foods"
            subtitle="Manage your menu and view items visually"
          />
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <FoodSearch onChange={setSearchValue} />
            <FoodBtn selected={selected} onSelect={setSelected} />
            <NewBtn />
          </div>
        </div>

        {!isLoading && restaurant ? (
          searchValue.length > 0 ? (
            filteredFoods.length > 0 ? (
              <FoodsMap
                data={filteredFoods}
                refetch={fetchFoods}
                selected={selected}
              />
            ) : (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <h2 style={{ fontSize: "20px", color: "#999" }}>
                  Hech qanday ovqat topilmadi 😕
                </h2>
                <p>Qidiruv so‘zingizni tekshiring yoki boshqa so‘z kiriting.</p>
              </div>
            )
          ) : (
            <FoodsMap data={foods} refetch={fetchFoods} selected={selected} />
          )
        ) : (
          <FoodMapSkeleton count={3} />
        )}
      </div>
    </>
  );
}

Foods.getLayout = (pageProps) => (
  <MainLayout>
    <Foods {...pageProps} />
  </MainLayout>
);
