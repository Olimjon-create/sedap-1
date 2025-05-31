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
  const [{ types }, {}] = useTypes();

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
