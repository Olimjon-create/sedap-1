import Head from "next/head";
import Image from "next/image";
import MainLayout from "@/components/common/layouts/MainLayout";
import useFetchApiItems from "@/hooks/useFetchApiItems";
import { useEffect } from "react";
import useCurrent from "@/hooks/useCurrentUser";

export default function Dashboard() {
  const user = useCurrent();
  const foundRestaurant = user?.restaurant;

  const [categories, isLoading, fetcher, realRefetch] = useFetchApiItems();

  useEffect(() => {
    if (foundRestaurant?.documentId) {
      realRefetch(
        `/categories?filters[restaurant][documentId][$eqi]=${foundRestaurant.documentId}`
      );
    }
  }, [foundRestaurant]);

  const handleCreateCategory = (res) => {
    if (res?.documentId) {
      const values = {
        data: {
          name: "Burger",
          description: "Burger desc",
          internalName: "OlimjonXamraqulovRes_Burger",
          restaurant: res.documentId,
        },
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };

      // Multiple server creation attempts
      ["113", "114", "84"].forEach((ip) => {
        fetch(`http://192.168.100.${ip}:1337/api/categories`, options)
          .then((response) => response.json())
          .then((res) => {
            console.log("Category yaratildi:", res);
          })
          .catch((error) => console.error("Category yaratishda xato:", error));
      });
    } else {
      console.warn("Restoran documentId mavjud emas!");
    }
  };

  const handleCreateType = (cats) => {
    const firstCat = cats[1] ?? null;
    if (firstCat?.documentId) {
      const values = {
        data: {
          name: "non",
          category: firstCat.documentId,
        },
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };

      ["113", "114", "84"].forEach((ip) => {
        fetch(`http://192.168.100.${ip}:1337/api/types`, options)
          .then((response) => response.json())
          .then((res) => {
            console.log("Type yaratildi:", res);
          })
          .catch((error) => console.error("Type yaratishda xato:", error));
      });
    } else {
      console.warn("Kategoriya documentId mavjud emas!");
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        <button onClick={() => handleCreateCategory(foundRestaurant)}>
          Create Category
        </button>
        <button onClick={() => handleCreateType(categories)}>
          Create Type
        </button>
        <Image
          src="/dashboard.png"
          width={1460}
          height={1544}
          alt="dashboard"
        />
      </div>
    </>
  );
}

Dashboard.getLayout = (pageProps) => (
  <MainLayout>
    <Dashboard {...pageProps} />
  </MainLayout>
);
