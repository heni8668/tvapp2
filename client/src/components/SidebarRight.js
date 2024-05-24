import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, Divider } from "@mui/material";
import { getChannels } from "../admin/services/channelService";

function SidebarRight() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetchChannels()
  }, []);

  const fetchChannels = async () => {
    const data = await getChannels();
    setChannels(data);
  };
  return (
    <Box sx={{ width: 200, bgcolor: "#172A41" }}>
      <List sx={{ mt: '20px', p: '30px'}}>
        {channels.map((channel, index) => (
          <ListItem button key={index}>
            <ListItemText
              sx={{ color: "white" }}
              primary={channel.name} // Assuming the backend returns an object with a 'name' field
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default SidebarRight;
