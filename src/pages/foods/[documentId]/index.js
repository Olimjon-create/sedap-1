import Head from "next/head";
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/common/layouts/MainLayout";
import PageTitle from "@/components/common/PageTitle";
import FoodSearch from "@/components/pages/foods/FoodSearch";
import NewBtn from "@/components/pages/foods/NewBtn";
import { useRouter } from "next/router";
import FoodDetailComponent from "@/components/pages/foods/FoodDetailComponent";
import axios from "axios";

export default function FoodDetailPage() {
  const router = useRouter();
  const [food, setFood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { documentId } = router.query;

    if (!documentId) return;

    setIsLoading(true);

    axios
      .get(
        `http://192.168.100.114:1337/api/foods/${documentId}?populate[type][populate][0]=category`
      )
      .then((res) => {
        const data = res.data.data;
        if (data) {
          setFood({
            ...data.attributes,
            documentId: data.id,
            type: {
              ...data.attributes.type?.data?.attributes,
              documentId: data.attributes.type?.data?.id,
              category: {
                ...data.attributes.type?.data?.attributes?.category?.data
                  ?.attributes,
                documentId:
                  data.attributes.type?.data?.attributes?.category?.data?.id,
              },
            },
          });
        }
      })
      .catch((err) => {
        console.error("Failed to fetch food", err);
        setFood(null);
      })
      .finally(() => setIsLoading(false));
  }, [router.query.documentId]);

  return (
    <>
      <Head>
        <title>Food Detail</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "26px",
            }}
          >
            <FoodSearch />
            <NewBtn />
          </div>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : food ? (
          <FoodDetailComponent data={food} />
        ) : (
          <p>Failed to load food data.</p>
        )}
      </div>
    </>
  );
}
FoodDetailPage.getLayout = (pageProps) => (
  <MainLayout>
    <FoodDetailPage {...pageProps} />
  </MainLayout>
);
