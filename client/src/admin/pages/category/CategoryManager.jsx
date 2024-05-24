import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleOpen = (category = null) => {
    setEditingCategory(category);
    setCategoryName(category ? category.name : "");
    setCategoryStatus(category ? category.status : true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
    setCategoryName("");
    setCategoryStatus(true);
  };

  const handleSave = async () => {
    const category = { name: categoryName, status: categoryStatus };
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, category);
      } else {
        await createCategory(category);
      }
      fetchCategories();
      handleClose();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleStatusToggle = async (category) => {
    const updatedCategory = { ...category, status: !category.status };
    try {
      await updateCategory(category.id, updatedCategory);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category status:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Category
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    style={{
                      color: category.status ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {category.status ? "Active" : "Inactive"}
                  </Typography>
                  <Switch
                    checked={category.status}
                    onChange={() => handleStatusToggle(category)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(category)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>{editingCategory ? "Edit Category" : "Add Category"}</h2>
          <TextField
            fullWidth
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={categoryStatus}
                onChange={(e) => setCategoryStatus(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography
                variant="body2"
                style={{
                  fontWeight: "bold",
                  color: categoryStatus ? "green" : "red",
                }}
              >
                Status: {categoryStatus ? "Active" : "Inactive"}
              </Typography>
            }
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              {editingCategory ? "Update" : "Add"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CategoryManager;
