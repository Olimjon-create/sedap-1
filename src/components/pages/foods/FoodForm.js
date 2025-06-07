import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

// 📌 Initial form data
const foodInitialValues = {
  documentId: null,
  name: "",
  image: "",
  type: "",
  price: "",
  comment: "",
};

function FoodForm({ title, food, btnText }) {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [category, setCategory] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [isSnackOpen, setIsSnackOpen] = useState(false);

  // Get user from localStorage
  let user = null;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
  }

  // Fetch restaurants
  useEffect(() => {
    if (!user?.documentId) return;

    axios
      .get(
        `http://192.168.100.114:1337/api/restaurants?filters[users][documentId][$eq]=${user.documentId}`
      )
      .then((res) => {
        const data =
          res.data.data?.map((item) => ({
            ...item.attributes,
            documentId: item.id,
          })) ?? [];
        setRestaurants(data);
      })
      .catch(console.error);
  }, [user]);

  const foundRestaurant = restaurants[0] ?? null;

  // Fetch categories based on restaurant
  useEffect(() => {
    if (!foundRestaurant?.documentId) return;

    axios
      .get(
        `http://192.168.100.114:1337/api/categories?filters[restaurant][documentId][$eq]=${foundRestaurant.documentId}`
      )
      .then((res) => {
        const data =
          res.data.data?.map((item) => ({
            ...item.attributes,
            documentId: item.id,
          })) ?? [];
        setCategories(data);
      })
      .catch(console.error);
  }, [foundRestaurant]);

  // Fetch types based on category
  useEffect(() => {
    if (!category) return;

    axios
      .get(
        `http://192.168.100.114:1337/api/types?filters[category][documentId][$eq]=${category}`
      )
      .then((res) => {
        const data =
          res.data.data?.map((item) => ({
            ...item.attributes,
            documentId: item.id,
          })) ?? [];
        setTypes(data);
      })
      .catch(console.error);
  }, [category]);

  // Set form values if editing
  useEffect(() => {
    if (food) {
      setFormData({
        documentId: food.documentId ?? null,
        name: food.name,
        image: food.image,
        type: food.type?.documentId,
        price: food.price,
        comment: food.comment,
      });
      setCategory(food.type?.category?.documentId);
    } else {
      setFormData(foodInitialValues);
    }
  }, [food]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      data: {
        name: formData.name,
        image: formData.image,
        price: formData.price,
        comment: formData.comment,
        type: { connect: [formData.type] },
        restaurant: foundRestaurant?.documentId ?? null,
      },
    };

    try {
      const url = formData.documentId
        ? `http://192.168.100.114:1337/api/foods/${formData.documentId}`
        : `http://192.168.100.114:1337/api/foods`;

      const method = formData.documentId ? "put" : "post";

      const response = await axios[method](url, values);

      setIsSnackOpen(true);
      setTimeout(() => {
        router.push(`/foods/${response.data.data.id}`);
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!formData) return null;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        margin: "auto",
        padding: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        marginTop: "30px",
      }}
    >
      <h1 style={{ color: "#00B074", marginBottom: "30px" }}>{title}</h1>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.documentId} value={cat.documentId}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) =>
                  handleChange({
                    target: { name: "type", value: e.target.value },
                  })
                }
              >
                {types.map((type) => (
                  <MenuItem key={type.documentId} value={type.documentId}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Comment"
              name="comment"
              multiline
              rows={4}
              value={formData.comment}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#00B074",
                "&:hover": { backgroundColor: "#009d60" },
              }}
            >
              {btnText}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackOpen}
        onClose={() => setIsSnackOpen(false)}
        message="Food is created"
      />
    </Box>
  );
}

export default FoodForm;
