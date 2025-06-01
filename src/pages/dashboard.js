import Head from "next/head";
import Image from "next/image";
import MainLayout from "@/components/common/layouts/MainLayout";
import useFetchApiItems from "@/hooks/useFetchApiItems";
import { useEffect } from "react";
import useCurrent from "@/hooks/useCurrentUser";

export default function Dashboard() {
<<<<<<< HEAD
  const user = useCurrent();
  // const [restaurants, isresLoading, refetchres] = useFetchApiItems(
  //   "/restaurants",
  //   {
  //     filters: {
  //       key: "users",
  //       users: {
  //         documentId: user?.documentId,
  //       },
  //     },
  //   }
  // );

  const foundRestaurant = user?.restaurant;
=======
  let user = null;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
  }

  const [restaurants, isresLoading, refetchres] = useFetchApiItems("/restaurants", {
    filters: {
      key: "users",
      users: {
        documentId: user?.documentId,
      },
    },
  });
>>>>>>> 95028bcbd473c4981aa9e5fc045d0ff3668b73d5

  const filtersTest = [
    {
      key: "[restaurant][documentId]",
      operator: "[$eqi]",
      value: foundRestaurant?.documentId,
      required: true,
    },
    {
      key: "[name]",
      operator: "[$containsi]",
      value: "hello",
      required: false,
    },
  ];

  const data1 = filtersTest
    .map((filter) => filter.key + filter.operator + "=" + filter.value)
    .join("&");

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
      console.log("res", res);
      const values = {
        data: {
          name: "Burger",
          description: "Burger desc",
          internalName: "OlimjonXamraqulovRes_Burger",
          restaurant: res.documentId,
        },
      };

      fetch("http://192.168.100.113:1337/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
<<<<<<< HEAD
      fetch("http://192.168.100.114:1337/api/categories", options)
=======
      fetch("http://192.168.100.84:1337/api/categories", options)
>>>>>>> 95028bcbd473c4981aa9e5fc045d0ff3668b73d5
        .then((response) => response.json())
        .then((res) => {
          console.log("Category yaratildi:", res);
        })
        .catch((error) => console.error("Category yaratishda xato:", error));
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

      fetch("http://192.168.100.113:1337/api/types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
<<<<<<< HEAD
      fetch("http://192.168.100.114:1337/api/types", options)
=======
      fetch("http://192.168.100.84:1337/api/types", options)
>>>>>>> 95028bcbd473c4981aa9e5fc045d0ff3668b73d5
        .then((response) => response.json())
        .then((res) => {
          console.log("Type yaratildi:", res);
        })
        .catch((error) => console.error("Type yaratishda xato:", error));
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
        <button onClick={() => handleCreateCategory(foundRestaurant)}>Create Category</button>
        <button onClick={() => handleCreateType(categories)}>Create type</button>
        <Image src="/dashboard.png" width={1460} height={1544} alt="back" />
      </div>
    </>
  );
}

Dashboard.getLayout = (pageProps) => (
  <MainLayout>
    <Dashboard {...pageProps} />
  </MainLayout>
);
