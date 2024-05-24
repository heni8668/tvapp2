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
  getChannels,
  createChannel,
  updateChannel,
  deleteChannel,
} from "../../services/channelService";

const ChannelManager = () => {
  const [channels, setChannels] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingChannel, setEditingChannel] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [channelStatus, setChannelStatus] = useState(true);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    const data = await getChannels();
    setChannels(data);
  };

  const handleOpen = (channel = null) => {
    setEditingChannel(channel);
    setChannelName(channel ? channel.name : "");
    setChannelStatus(channel ? channel.status : true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingChannel(null);
    setChannelName("");
    setChannelStatus(true);
  };

  const handleSave = async () => {
    const channel = { name: channelName, status: channelStatus };
    try {
      if (editingChannel) {
        await updateChannel(editingChannel.id, channel);
      } else {
        await createChannel(channel);
      }
      fetchChannels();
      handleClose();
    } catch (error) {
      console.error("Error saving channel:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteChannel(id);
      fetchChannels();
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  const handleStatusToggle = async (channel) => {
    const updatedChannel = { ...channel, status: !channel.status };
    try {
      await updateChannel(channel.id, updatedChannel);
      fetchChannels();
    } catch (error) {
      console.error("Error updating channel status:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Channel
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
            {channels.map((channel) => (
              <TableRow key={channel.id}>
                <TableCell>{channel.id}</TableCell>
                <TableCell>{channel.name}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    style={{
                      color: channel.status ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {channel.status ? "Active" : "Inactive"}
                  </Typography>
                  <Switch
                    checked={channel.status}
                    onChange={() => handleStatusToggle(channel)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(channel)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(channel.id)}
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
          <h2>{editingChannel ? "Edit Channel" : "Add Channel"}</h2>
          <TextField
            fullWidth
            label="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={channelStatus}
                onChange={(e) => setChannelStatus(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2" style={{ fontWeight: "bold" }}>
                Status: {channelStatus ? "Active" : "Inactive"}
              </Typography>
            }
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              {editingChannel ? "Update" : "Add"}
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

export default ChannelManager;
