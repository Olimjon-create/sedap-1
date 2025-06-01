import React, { useState } from "react";
import CustomBtnFood from "@/components/pages/foods/CustomBtnFood";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import CategoryDialog from "./Dialog";

function CategoryTable({ categories, onDelete, onRefetch, setCat }) {
  const [dialogState, setDialogState] = useState({
    open: false,
    categoryId: null,
  });

  const handleEdit = (cat) => {
    setCat(cat);
    console.log("Edit clicked:", cat);
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
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <TableRow key={cat.documentId || cat.id}>
                  <TableCell>{cat.id}</TableCell>
                  <TableCell>{cat.name || cat.attributes?.name}</TableCell>
                  <TableCell>
                    {cat.description || cat.attributes?.description || "-"}
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
                          categoryId: cat.documentId || cat.id,
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
        onConfirm={() => {
          if (dialogState.categoryId) {
            onDelete(dialogState.categoryId);
          }
          setDialogState({ open: false, categoryId: null });
        }}
        onClose={() => setDialogState({ open: false, categoryId: null })}
        onRefetch={onRefetch}
      />
    </>
  );
}

export default CategoryTable;
