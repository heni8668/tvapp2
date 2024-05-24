import axios from "axios";



export const getChannels = async () => {
  const response = await axios.get(`http://localhost:5000/api/channels/get-channel`);
  return response.data;
};

export const createChannel = async (channel) => {
  const response = await axios.post(
    `http://localhost:5000/api/channels/add-channel`,
    channel
  );
  return response.data;
};

export const updateChannel = async (id, channel) => {
  const response = await axios.put(
    `http://localhost:5000/api/channels/update-channel/${id}`,
    channel
  );
  return response.data;
};

export const deleteChannel = async (id) => {
  const response = await axios.delete(
    `http://localhost:5000/api/channels/delete-channel/${id}`
  );
  return response.data;
};
