import axios from 'axios';

const getData = async () => {
  try {
    const response = await axios.get('http://localhost:1337/api/todos');
    // console.log(response.data);

    return response.data;
  } catch (error) {
    throw new Error('Data not found');
  }
};
