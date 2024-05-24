import axios from "axios";

export const getChannels = async () => {
  const response = await axios.get(
    `https://tvapp2-2.onrender.com/api/channels/get-channel`
  );
  return response.data;
};

export const createChannel = async (channel) => {
  const response = await axios.post(
    `https://tvapp2-2.onrender.com/api/channels/add-channel`,
    channel
  );
  return response.data;
};

export const updateChannel = async (id, channel) => {
  const response = await axios.put(
    `https://tvapp2-2.onrender.com/api/channels/update-channel/${id}`,
    channel
  );
  return response.data;
};

export const deleteChannel = async (id) => {
  const response = await axios.delete(
    `https://tvapp2-2.onrender.com/api/channels/delete-channel/${id}`
  );
  return response.data;
};
