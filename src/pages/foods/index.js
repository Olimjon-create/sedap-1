import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import MainLayout from "@/components/common/layouts/MainLayout";
import PageTitle from "@/components/common/PageTitle";
import { foodData } from "@/data";
import FoodsMap from "@/components/pages/foods/FoodsMap";
import FoodMapSkeleton from "@/components/pages/foods/FoodMapSkeleton";
import FoodSearch from "@/components/pages/foods/FoodSearch";
import FoodSelect from "@/components/pages/foods/FoodSelect";
import NewBtn from "@/components/pages/foods/NewBtn";

export default function Foods() {
  const [foods, setFoods] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFoods(foodData);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (foods && searchValue.length > 0) {
      const filtered = foods.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredFoods(filtered);
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
            marginBottom: "55px",
          }}
        >
          <PageTitle
            title="Foods"
            subtitle="Here is your menus summary with graph view"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "26px",
            }}
          >
            <FoodSearch onChange={setSearchValue} />
            <FoodSelect
              img="/foodSelectImg.png"
              item={{
                name: "noodle",
                name2: "pizza",
                name3: "burger",
              }}
            />
            <FoodSelect
              img="/foodSelectImg2.png"
              item={{
                name: "food",
                name2: "drink",
              }}
            />
            <NewBtn />
          </div>
        </div>

        {foods ? (
          searchValue.length > 0 ? (
            filteredFoods.length > 0 ? (
              <FoodsMap data={filteredFoods} />
            ) : (
              <h1
                style={{
                  textAlign: "center",
                }}
              >
                Food topilmadi!
              </h1>
            )
          ) : (
            <FoodsMap data={foods} />
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
