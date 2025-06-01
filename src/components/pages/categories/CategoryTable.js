import React, { useEffect, useState } from "react";
import CustomBtnFood from "@/components/pages/foods/CustomBtnFood";
import { axiosInstance } from "@/utils/axiosInstance";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import CategoryDialog from "./Dialog";

function CategoryTable({ categories, onDelete, onRefetch, onUpdate, setCat }) {
  const [dialogState, setDialogState] = useState({
    open: false,
    categoryId: null,
  });

<<<<<<< HEAD
  // const [foundRestaurant, setFoundRestaurant] = useState(null);

  const [categories, isLoading, refetchCategories] = useFetchApiItems(
    user?.restaurantId
      ? `/categories?filters[restaurant][documentId][$eq]=${user?.restaurantId}`
      : null
  );

  console.log(categories);
  // const [dialogState, setDialogState] = useState({
  //   open: false,
  //   categoryId: null,
  // });

  const handleDelete = (categoryId) => {
    if (categoryId) {
      axiosInstance(
        `http://192.168.100.114:1337/api/categories/${categoryId}`,
        {
          method: "DELETE",
        }
      )
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
=======
  const handleEdit = (cat) => {
    setCat(cat);
    console.log("categori table", cat);
>>>>>>> 36e647cbe2a93b925766db517509c535d0c7ce35
  };

  return (
    <>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell
                sx={{ textAlign: "end", paddingRight: "40px" }}
                colSpan={2}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>{cat.id}</TableCell>
                  <TableCell>{cat.attributes?.name || cat.name}</TableCell>
                  <TableCell>
                    {cat.attributes?.description || cat.description || "-"}
                  </TableCell>
                  <TableCell
                    sx={{ display: "flex", gap: "20px", justifyContent: "end" }}
                  >
                    <CustomBtnFood
                      onClick={() => handleEdit(cat)}
                      back="#FF5B5B26"
                      img="/foodicon2.png"
                      text="Edit"
                    />
                    <CustomBtnFood
                      onClick={() =>
                        setDialogState({
                          open: true,
                          categoryId: cat.documentId,
                        })
                      }
                      back="#2D9CDB26"
                      img="/foodIcon3.png"
                      text="Delete"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Hech qanday category topilmadi
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
      <CategoryDialog
        isOpen={dialogState.open}
        onConfirm={() => onDelete(dialogState.categoryId)}
        onClose={() => {
          setDialogState({
            open: false,
            categoryId: null,
          });
        }}
        onRefetch={onRefetch}
      />
    </>
  );
}

export default CategoryTable;
