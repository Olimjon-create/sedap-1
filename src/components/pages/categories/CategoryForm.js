import React, { useEffect, useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import useCurrentUser from "@/hooks/useCurrentUser";
<<<<<<< HEAD
import useCategories from "@/hooks/useCategories";
=======
import useCategory from "@/hooks/useCategories";
>>>>>>> 36e647cbe2a93b925766db517509c535d0c7ce35

export default function CategoryForm({
  onCreate,
  onRefetch,
  category,
  onUpdate,
  onCancel,
}) {
<<<<<<< HEAD
  const user = useCurrentUser();
  const { loading, error: hookError, handleCreateCategory } = useCategories();

=======
>>>>>>> 36e647cbe2a93b925766db517509c535d0c7ce35
  const [form, setForm] = useState({
    documentId: null,
    name: "",
    description: "",
  });
<<<<<<< HEAD
=======
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    if (category) {
      setForm({
        documentId: category.documentId,
        name: category.name,
        description: category.description,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (form.documentId) {
      onUpdate(form);
    } else {
      onCreate(form);
    }
    setForm({
      documentId: null,
      name: "",
      description: "",
    });
  };
  const [loading, setLoading] = useState(false);
>>>>>>> 36e647cbe2a93b925766db517509c535d0c7ce35
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editCategory) {
      setForm({
        documentId: editCategory.documentId || null,
        name: editCategory.name || "",
        description: editCategory.description || "",
      });
    } else {
      setForm({
        documentId: null,
        name: "",
        description: "",
      });
    }
    setError(null);
  }, [editCategory]);
<<<<<<< HEAD

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError("Category nomi kerak");
      return false;
    }
    if (!foundRestaurant || !foundRestaurant.documentId) {
      setError("Restoran topilmadi");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      const payload = {
        data: {
          name: form.name.trim(),
          description: form.description.trim(),
          internalName: `${foundRestaurant.name}_${form.name}`.replace(
            /\s+/g,
            ""
          ),
          restaurant: foundRestaurant.documentId,
        },
      };

      let url = `http://192.168.100.109:1337/api/categories`;
      let method = "POST";

      if (form.documentId) {
        url = `http://192.168.100.109:1337/api/categories/${form.documentId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message || "Category saqlashda xatolik yuz berdi"
        );
      }

      setForm({
        documentId: null,
        name: "",
        description: "",
      });

      if (onSuccess) onSuccess(data);
      if (refetchCategories) refetchCategories();
    } catch (err) {
      setError(err.message || "Xatolik yuz berdi");
    }
  };

=======
  console.log(form);
>>>>>>> 36e647cbe2a93b925766db517509c535d0c7ce35
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <TextField
            label="Category nomi"
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={{ flexGrow: 1, minWidth: 200 }}
            disabled={loading}
          />
          <TextField
            label="Category ta'rifi"
            name="description"
            value={form.description}
            onChange={handleChange}
            sx={{ flexGrow: 2, minWidth: 300 }}
            disabled={loading}
          />
        </Box>

        {error && <Box sx={{ color: "error.main", mb: 1 }}>{error}</Box>}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="contained"
            color={form.documentId ? "warning" : "primary"}
            type="submit"
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
<<<<<<< HEAD
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : form.documentId ? (
              "Saqlash"
            ) : (
              "Qo'shish"
            )}
          </Button>
          {onCancel && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={onCancel}
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              Bekor qilish
            </Button>
=======
            {form.documentId ? "update" : "create"}
          </Button>

          {form.documentId && (
            <IconButton color="error" onClick={onCancel} disabled={loading}>
              <CloseIcon />
            </IconButton>
>>>>>>> 36e647cbe2a93b925766db517509c535d0c7ce35
          )}
        </Box>
      </Box>
    </form>
  );
}
