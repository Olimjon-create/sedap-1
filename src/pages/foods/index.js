import Head from "next/head";
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/common/layouts/MainLayout";
import PageTitle from "@/components/common/PageTitle";
import FoodsMap from "@/components/pages/foods/FoodsMap";
import FoodMapSkeleton from "@/components/pages/foods/FoodMapSkeleton";
import FoodSearch from "@/components/pages/foods/FoodSearch";
import FoodBtn from "@/components/pages/foods/FoodBtn";
import NewBtn from "@/components/pages/foods/NewBtn";
import useFetchApiItems from "@/hooks/useFetchApiItems";
import useCurrent from "@/hooks/useCurrentUser";

export default function Foods() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selected, setSelected] = useState("left");
  const [hasFetched, setHasFetched] = useState(false);

  const user = useCurrent();

  const [restaurants, isResLoading] = useFetchApiItems(
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

  const foundRestaurant = restaurants[0] ?? null;

  const [foods, isLoading, refetch] = useFetchApiItems(
    "/foods",
    foundRestaurant && {
      filters: {
        restaurant: {
          documentId: foundRestaurant.documentId,
        },
        key: "restaurant",
      },
      populate: {
        type: {
          populate: ["category"],
        },
        restaurant: true,
      },
    }
  );

  // faqat bitta marta fetch qilish uchun
  useEffect(() => {
    if (foundRestaurant && !hasFetched) {
      setHasFetched(true);
      refetch(); // faqat bir marta chaqiriladi
    }
  }, [foundRestaurant]);

  // qidiruv uchun filtr
  useEffect(() => {
    if (searchValue.length > 0 && foods) {
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

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <PageTitle
            title="Foods"
            subtitle="Here is your menus summary with graph view"
          />
          <div style={{ display: "flex", alignItems: "center", gap: "26px" }}>
            <FoodSearch onChange={setSearchValue} />
            <FoodBtn selected={selected} onSelect={setSelected} />
            <NewBtn />
          </div>
        </div>

        {!isLoading && foundRestaurant ? (
          searchValue.length > 0 ? (
            filteredFoods.length > 0 ? (
              <FoodsMap
                data={filteredFoods}
                refetch={refetch}
                selected={selected}
              />
            ) : (
              <h1 style={{ textAlign: "center" }}>Food topilmadi!</h1>
            )
          ) : (
            <FoodsMap data={foods} refetch={refetch} selected={selected} />
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
