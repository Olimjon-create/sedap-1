import Head from "next/head";
import Image from "next/image";
import MainLayout from "@/components/common/layouts/MainLayout";
import { useEffect, useState } from "react";
import useCurrent from "@/hooks/useCurrentUser";

export default function Dashboard() {
  const user = useCurrent();
  const foundRestaurant = user?.restaurant;

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Kategoriyalarni fetch qilish
  const realRefetch = async (url) => {
    if (!url) return;
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data?.data) {
        setCategories(data.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Kategoriya olishda xatolik:", error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (foundRestaurant?.documentId) {
      realRefetch(
        `/categories?filters[restaurant][documentId][$eqi]=${foundRestaurant.documentId}`
      );
    }
  }, [foundRestaurant]);

  const handleCreateCategory = (res) => {
    if (!res?.documentId) {
      console.warn("Restoran documentId mavjud emas!");
      return;
    }

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

    ["113", "114", "84"].forEach((ip) => {
      fetch(`http://192.168.100.${ip}:1337/api/categories`, options)
        .then((response) => response.json())
        .then((res) => {
          console.log("Category yaratildi:", res);
          realRefetch(
            `/categories?filters[restaurant][documentId][$eqi]=${foundRestaurant.documentId}`
          );
        })
        .catch((error) => console.error("Category yaratishda xatolik:", error));
    });
  };

  const handleCreateType = (cats) => {
    const firstCat = cats?.[1];
    const categoryId = firstCat?.documentId || firstCat?.id;

    if (!categoryId) {
      console.warn("Kategoriya documentId topilmadi!");
      return;
    }

    const values = {
      data: {
        name: "non",
        category: categoryId,
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
        .catch((error) => console.error("Type yaratishda xatolik:", error));
    });
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        <button
          onClick={() => handleCreateCategory(foundRestaurant)}
          style={{ marginRight: "10px" }}
        >
          Create Category
        </button>
        <button onClick={() => handleCreateType(categories)}>
          Create Type
        </button>

        {isLoading ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Yuklanmoqda...
          </p>
        ) : (
          <Image
            src="/dashboard.png"
            width={1460}
            height={1544}
            alt="dashboard"
            style={{ marginTop: "20px" }}
          />
        )}
      </div>
    </>
  );
}

Dashboard.getLayout = (pageProps) => (
  <MainLayout>
    <Dashboard {...pageProps} />
  </MainLayout>
);
