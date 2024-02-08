import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

type Data = {
  id: number;
  data: object;
};
const deleteData = async ({ id, data }: Data) => {
  try {
    const response = await axios.delete(
      `http://localhost:1337/api/todos/${id}`,
      data
    );
    console.log(response.data);

    return response.data.data;
  } catch (error: string | undefined | any) {
    throw new Error(error);
  }
};

export const deleteItems = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, data }: Data) => deleteData({ id, data }), {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });
};
