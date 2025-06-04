// import React, { useState } from "react";
// import CustomBtnFood from "@/components/pages/foods/CustomBtnFood";
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
// } from "@mui/material";
// import CategoryDialog from "./Dialog";
import axios from "axios";
// function CategoryTable({ categories, onDelete, onRefetch, setCat }) {
//   const [dialogState, setDialogState] = useState({
//     open: false,
//     categoryId: null,
//   });

//   const handleEdit = (cat) => {
//     setCat(cat);
//     console.log("Edit clicked:", cat);
//   };

//   return (
//     <>
//       <Paper>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell
//                 sx={{ textAlign: "end", paddingRight: "40px" }}
//                 colSpan={2}
//               >
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {categories && categories.length > 0 ? (
//               categories.map((cat) => (
//                 <TableRow key={cat.documentId || cat.id}>
//                   <TableCell>{cat.id}</TableCell>
//                   <TableCell>{cat.name || cat.attributes?.name}</TableCell>
//                   <TableCell>
//                     {cat.description || cat.attributes?.description || "-"}
//                   </TableCell>
//                   <TableCell
//                     sx={{ display: "flex", gap: "20px", justifyContent: "end" }}
//                   >
//                     <CustomBtnFood
//                       onClick={() => handleEdit(cat)}
//                       back="#FF5B5B26"
//                       img="/foodicon2.png"
//                       text="Edit"
//                     />
//                     <CustomBtnFood
//                       onClick={() =>
//                         setDialogState({
//                           open: true,
//                           categoryId: cat.documentId || cat.id,
//                         })
//                       }
//                       back="#2D9CDB26"
//                       img="/foodIcon3.png"
//                       text="Delete"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   Hech qanday category topilmadi
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </Paper>

//       <CategoryDialog
//         isOpen={dialogState.open}
//         onConfirm={() => {
//           if (dialogState.categoryId) {
//             onDelete(dialogState.categoryId);
//           }
//           setDialogState({ open: false, categoryId: null });
//         }}
//         onClose={() => setDialogState({ open: false, categoryId: null })}
//         onRefetch={onRefetch}
//       />
//     </>
//   );
// }

// export default CategoryTable;
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import CustomBtnFood from "@/components/pages/foods/CustomBtnFood";

function CategoryTable({
  setDialogState,
  handleChange,
  handleSubmit,
  categories = [],
  isLoading,
  refetchCategories,
}) {
  const [form, setForm] = useState({
    documentId: null,
    name: "",
    description: "",
  });

  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    if (editCategory) {
      setForm({
        documentId: editCategory.documentId || editCategory.id,
        name: editCategory.name || editCategory.attributes?.name || "",
        description:
          editCategory.description ||
          editCategory.attributes?.description ||
          "",
      });
    }
  }, [editCategory]);

  const handleDelete = (categoryId) => {
    if (categoryId) {
      axios(`http://192.168.100.114:1337/api/categories/${categoryId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            console.log("Category deleted");
            setDialogState({
              open: false,
              categoryId: null,
            });
            if (refetchCategories) refetchCategories(); // Refresh data
          } else {
            console.error("Failed to delete category");
          }
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    }
  };

  const cancelEdit = () => {
    setEditCategory(null);
    setForm({ documentId: null, name: "", description: "" });
  };

  return (
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Yuklanmoqda...
              </TableCell>
            </TableRow>
          ) : categories.length > 0 ? (
            categories.map((cat) => (
              <TableRow key={cat.id || cat.documentId}>
                <TableCell>{cat.id || cat.documentId}</TableCell>
                <TableCell>{cat.attributes?.name || cat.name}</TableCell>
                <TableCell>
                  {cat.attributes?.description || cat.description || "-"}
                </TableCell>
                <TableCell
                  sx={{ display: "flex", gap: "20px", justifyContent: "end" }}
                >
                  <CustomBtnFood
                    onClick={() => setEditCategory(cat)}
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
  );
}

export default CategoryTable;
