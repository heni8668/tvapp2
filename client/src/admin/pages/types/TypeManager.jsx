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
  getTypes,
  createType,
  updateType,
  deleteType,
} from "../../services/typeService";

const TypeManager = () => {
  const [types, setTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [typeName, setTypeName] = useState("");
  const [typeStatus, setTypeStatus] = useState(true);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    const data = await getTypes();
    setTypes(data);
  };

  const handleOpen = (type = null) => {
    setEditingType(type);
    setTypeName(type ? type.name : "");
    setTypeStatus(type ? type.status : true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingType(null);
    setTypeName("");
    setTypeStatus(true);
  };

  const handleSave = async () => {
    const type = { name: typeName, status: typeStatus };
    try {
      if (editingType) {
        await updateType(editingType.id, type);
      } else {
        await createType(type);
      }
      fetchTypes();
      handleClose();
    } catch (error) {
      console.error("Error saving type:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteType(id);
      fetchTypes();
    } catch (error) {
      console.error("Error deleting type:", error);
    }
  };

  const handleStatusToggle = async (type) => {
    const updatedType = { ...type, status: !type.status };
    try {
      await updateType(type.id, updatedType);
      fetchTypes();
    } catch (error) {
      console.error("Error updating type status:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Type
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
            {types.map((type) => (
              <TableRow key={type.id}>
                <TableCell>{type.id}</TableCell>
                <TableCell>{type.name}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    style={{
                      color: type.status ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {type.status ? "Active" : "Inactive"}
                  </Typography>
                  <Switch
                    checked={type.status}
                    onChange={() => handleStatusToggle(type)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(type)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(type.id)}
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
          <h2>{editingType ? "Edit Type" : "Add Type"}</h2>
          <TextField
            fullWidth
            label="Type Name"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={typeStatus}
                onChange={(e) => setTypeStatus(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography
                variant="body2"
                style={{
                  fontWeight: "bold",
                  color: typeStatus ? "green" : "red",
                }}
              >
                Status: {typeStatus ? "Active" : "Inactive"}
              </Typography>
            }
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              {editingType ? "Update" : "Add"}
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

export default TypeManager;
