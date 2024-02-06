import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

type Data = {
  title: string;
};

const postData = async (data: Data) => {
  try {
    const response = await axios.post('http://localhost:1337/api/todos', {
      data,
    });
    // console.log(response.data);

    return response.data.data;
  } catch (error) {
    throw new Error('Data not found');
  }
};

export const postItems = () => {
  const queryClient = useQueryClient();
  return useMutation((data: Data) => postData(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });
};
