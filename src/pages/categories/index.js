import React, { useState } from "react";
import MainLayout from "@/components/common/layouts/MainLayout";
import { Typography, Box } from "@mui/material";
import CategoryTable from "@/components/pages/categories/CategoryTable";
<<<<<<< HEAD
import useCurrentUser from "@/hooks/useCurrentUser";
import useCategory from "@/hooks/useCategories";
import CategoryForm from "@/components/pages/categories/CategoryForm";
export default function CategoriesPage() {
  const user = useCurrentUser();
  const { handleCreateCategory } = useCategory();

  const [cate, setCate] = useState({
    name: "",
    description: "",
  });

  const [dialogState, setDialogState] = useState({
    open: false,
    categoryId: null,
  });

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={3}>
        {user?.restaurantId} Create restoranining Categories
=======
import CategoryForm from "@/components/pages/categories/CategoryForm";
import useCategories from "@/hooks/useCategories";

export default function CategoriesPage() {
  const [
    { categories, isLoading, error, reFetch },
    { getCategory, createCategory, updateCategory, deleteCategory },
  ] = useCategories();
  const [cat, setCat] = useState(null);
  console.log(cat);
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={3}>
        restoranining Categories
>>>>>>> 36e647cbe2a93b925766db517509c535d0c7ce35
      </Typography>
      <CategoryForm
        onCreate={createCategory}
        onRefetch={reFetch}
        category={cat}
        onUpdate={updateCategory}
      />
      <CategoryTable
        categories={categories}
        onDelete={deleteCategory}
        onRefetch={reFetch}
        setCat={setCat}
      />
    </Box>
  );
}

CategoriesPage.getLayout = (pageProps) => (
  <MainLayout>
    <CategoriesPage {...pageProps} />
  </MainLayout>
);
