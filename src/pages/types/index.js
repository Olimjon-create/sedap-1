import React, { useEffect, useState } from "react";
import MainLayout from "@/components/common/layouts/MainLayout";
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TypeTable from "@/components/pages/types/TypeTable";
import axios from "axios";
import useCurrent from "@/hooks/useCurrentUser";
import useFetchApiItems from "@/hooks/useFetchApiItems";
import CustomBtnFood from "@/components/pages/foods/CustomBtnFood";
import TypeForm from "@/components/pages/types/TypeForm";
import useTypes from "@/hooks/useTypes";

export default function TypePage() {
<<<<<<< HEAD
  const user = useCurrent();
  const [foundRestaurant, setFoundRestaurant] = useState(null);

  const [dialogState, setDialogState] = useState({
    open: false,
    categoryId: null,
  });

  const handleDelete = async (typeId) => {
    if (!typeId) return;

    try {
      const res = await axios.delete(
        `http://192.168.100.114:1337/api/types/${typeId}`
      );
      console.log("Deleted:", res.data);
      setDialogState({ open: false, categoryId: null });
      refetchCategories();
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const [categories, isLoading, refetchCategories] = useFetchApiItems(
    foundRestaurant
      ? `/categories?filters[restaurant][documentId][$eq]=${foundRestaurant.documentId}`
      : null
  );

  const [editCategory, setEditCategory] = useState(null);

  function cancelEdit() {
    setEditCategory(null);
  }

  useEffect(() => {
    if (user?.restaurants?.length > 0) {
      setFoundRestaurant(user.restaurants[0]);
    }
  }, [user]);
=======
  const [{ types }, {}] = useTypes();
>>>>>>> 36e647cbe2a93b925766db517509c535d0c7ce35

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={3}>
        restoranining Type
      </Typography>

      <TypeForm
      // editCategory={editCategory}
      // onCancel={cancelEdit}
      // foundRestaurant={foundRestaurant}
      // cat={categories}
      />
      <TypeTable
        categories={types}
        // onDelete={deleteCategory}
        // onRefetch={reFetch}
        // onUpdate={updateCategory}
      />
    </Box>
  );
}

TypePage.getLayout = (pageProps) => (
  <MainLayout>
    <TypePage {...pageProps} />
  </MainLayout>
);
