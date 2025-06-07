import React from "react";
import MainLayout from "@/components/common/layouts/MainLayout";
import Head from "next/head";
import FoodForm from "@/components/pages/foods/FoodForm";
import { useRouter } from "next/router";

export default function FoodEdit() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Food Edit</title>
      </Head>
      <FoodForm title={"Edit food"} btnText={"Edit Food"} />
    </>
  );
}

FoodEdit.getLayout = (pageProps) => (
  <MainLayout>
    <FoodEdit {...pageProps} />
  </MainLayout>
);
