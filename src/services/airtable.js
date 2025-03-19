import axios from 'axios';

const api = axios.create({
  baseURL: "https://api.airtable.com/v0/appRG63SKAJkFK3s4/tblU1GaikW6KeOh6W",
  headers: {
    // If the API key is sensitive, you should store it in a .env file and reference it here,
    Authorization: `Bearer patevysYr09DAihZv.2083c7a3bde98fa4d001e6e14de0e01be59a75732175ac3c8f2ec9bf47264868`,
    'Content-Type': 'application/json',
  },
});

const getRecords = async () => {
  try {
    const response = await api.get();
    return response.data.records;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default getRecords;