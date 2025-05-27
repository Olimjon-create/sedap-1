import React, { useEffect, useState } from "react";
import MainLayout from "@/components/common/layouts/MainLayout";
import CategoryDialog from "@/components/pages/categories/Dialog";
import { Typography, Box } from "@mui/material";
import CategoryTable from "@/components/pages/categories/CategoryTable";
import useCurrent from "@/hooks/useCurrentUser";
import useFetchApiItems from "@/hooks/useFetchApiItems";
import CustomBtnFood from "@/components/pages/foods/CustomBtnFood";
import CategoryForm from "@/components/pages/categories/CategoryForm";
import useCurrentUser from "@/hooks/useCurrentUser";
import useCategory from "@/hooks/useCategory";

export default function CategoriesPage() {
  const user = useCurrentUser();
  const [handleCreateCategory] = useCategory();
  const [cate, setCate] = useState({
    name: "",
    description: "",
  });

  // const [editCategory, setEditCategory] = useState(null);

  const [dialogState, setDialogState] = useState({
    open: false,
    categoryId: null,
  });

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
        {user?.restaurantId} restoranining Categories
      </Typography>
      <CategoryForm />
      <CategoryTable setDialogState={setDialogState} />
      <CategoryDialog
        dialogState={dialogState}
        setDialogState={setDialogState}
      />
    </Box>
  );
}

CategoriesPage.getLayout = (pageProps) => (
  <MainLayout>
    <CategoriesPage {...pageProps} />
  </MainLayout>
);
