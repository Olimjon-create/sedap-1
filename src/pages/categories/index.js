import React, { useEffect, useState } from "react";
import MainLayout from "@/components/common/layouts/MainLayout";
import { Typography, Box } from "@mui/material";
import CategoryTable from "@/components/pages/categories/CategoryTable";
import CategoryForm from "@/components/pages/categories/CategoryForm";
import useCategories from "@/hooks/useCategories";

export default function CategoriesPage() {
  const [
    { categories, isLoading, error, reFetch },
    { getCategory, createCategory, updateCategory, deleteCategory },
  ] = useCategories();
  const [cate, setCate] = useState({
    name: "",
    description: "",
  });

  // const [editCategory, setEditCategory] = useState(null);

  // function cancelEdit() {
  //   setEditCategory(null);
  //   setForm({ name: "", description: "" });
  // }
  // console.log(user);
  // // useEffect(() => {
  // //   if (user?.restaurants?.length > 0) {
  // //     setFoundRestaurant(user.restaurants[0]);
  // //   }
  // // }, [user]);

  // // const [categories, isLoading, refetchCategories, deleteCat, createCat] =
  // //   useCategories();

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={3}>
        restoranining Categories
      </Typography>
      <CategoryForm onCreate={createCategory} onRefetch={reFetch} />
      <CategoryTable
        categories={categories}
        onDelete={deleteCategory}
        onRefetch={reFetch}
        onUpdate={updateCategory}
      />
    </Box>
  );
}

CategoriesPage.getLayout = (pageProps) => (
  <MainLayout>
    <CategoriesPage {...pageProps} />
  </MainLayout>
);
