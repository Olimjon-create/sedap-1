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
import CategoryTable from "@/components/pages/categories/CategoryTable";
import useCurrent from "@/hooks/useCurrent";
import useFetchApiItems from "@/hooks/useFetchApiItems";
import CustomBtnFood from "@/components/pages/foods/CustomBtnFood";
import CategoryForm from "@/components/pages/categories/CategoryForm";

export default function CategoriesPage() {
  const user = useCurrent();
  const [foundRestaurant, setFoundRestaurant] = useState(null);

  const [dialogState, setDialogState] = useState({
    open: false,
    categoryId: null,
  });

  const handleDelete = (categoryId) => {
    if (categoryId) {
      fetch(`http://192.168.100.109:1337/api/categories/${categoryId}`, {
        method: "DELETE",
      })
        .then((res) => {
          console.log("delete:", res);
          if (res.ok) {
            setDialogState({
              open: false,
              categoryId: null,
            });
            refetchCategories();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [editCategory, setEditCategory] = useState(null);

  function cancelEdit() {
    setEditCategory(null);
    setForm({ name: "", description: "" });
  }

  useEffect(() => {
    if (user?.restaurants?.length > 0) {
      setFoundRestaurant(user.restaurants[0]);
    }
  }, [user]);

  // const [categories, isLoading, refetchCategories, deleteCat, createCat] =
  //   useCategories();

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={3}>
        {foundRestaurant?.name} restoranining Categories
      </Typography>
      <CategoryForm
        editCategory={editCategory}
        onCancel={cancelEdit}
        foundRestaurant={foundRestaurant}
      />
      <CategoryTable />
      <Dialog
        open={dialogState.open}
        onClose={() => {
          setDialogState({
            open: false,
            categoryId: null,
          });
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setDialogState({
                open: false,
                categoryId: null,
              })
            }
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(dialogState.categoryId)}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

CategoriesPage.getLayout = (pageProps) => (
  <MainLayout>
    <CategoriesPage {...pageProps} />
  </MainLayout>
);
