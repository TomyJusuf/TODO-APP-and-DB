import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

type Data = {
  isDone: boolean;
};
const updateData = async (id: any, data: Data) => {
  try {
    const response = await axios.put(`http://localhost:1337/api/todos/${id}`, {
      data,
    });
    console.log(response.data);

    return response.data.data;
  } catch (error) {
    throw new Error('Data not found');
  }
};

export const updateItems = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, data }: any) => updateData(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });
};
