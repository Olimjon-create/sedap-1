import React, { useState } from "react";
import MainLayout from "@/components/common/layouts/MainLayout";
import CategoryDialog from "@/components/pages/categories/Dialog";
import { Typography, Box } from "@mui/material";
import CategoryTable from "@/components/pages/categories/CategoryTable";
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
