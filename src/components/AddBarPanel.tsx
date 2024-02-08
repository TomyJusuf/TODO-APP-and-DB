import { SubmitHandler, UseFormProps, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postItems } from '../hooks/postItem';
import { Data } from '../types/type';

const schema = yup.object().shape({
  title: yup.string().min(1).required(),
  isDone: yup.boolean(),
});

export default function AddBarPanel() {
  const { mutate: postItemData } = postItems();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      isDone: false, // Set your default value for isDone
    },
  } as UseFormProps<Data>);

  const onSubmit: SubmitHandler<Data> = (data) => {
    postItemData(data); // Update the state to trigger a re-render
  };

  return (
    <div className="container mx-auto w-[810px] mt-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="input_table flex justify-center  "
      >
        <input
          type="text"
          id=""
          placeholder="Add task"
          className="bg-slate-300 w-10/12  pl-5"
          {...register('title')}
        />
        {errors.title && (
          <p className="absolute mt-12 text-red-600">
            * This field is required ,minimal characters 5 letters*
          </p>
        )}
        <button
          type="submit"
          className="bg-violet-600 py-3 px-5 font-bold text-white uppercase"
        >
          Add todo
        </button>
      </form>
    </div>
  );
}
