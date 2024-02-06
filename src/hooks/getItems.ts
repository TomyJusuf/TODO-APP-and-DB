import axios from 'axios';
import { useQuery } from 'react-query';

const getData = async () => {
  try {
    const response = await axios.get('http://localhost:1337/api/todos');
    // console.log(response.data);

    return response.data.data;
  } catch (error) {
    throw new Error('Data not found');
  }
};

export const getItems = () => useQuery('todos', getData);
