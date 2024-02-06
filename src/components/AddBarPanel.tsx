import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const schema = yup.object().shape({
  input: yup.string().min(1).required(),
});

type Data = {
  input: string;
};

export default function AddBarPanel() {
  const [inputData, setInputData] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({ resolver: yupResolver(schema) });

  const onSubmit = (data: Data) => {
    setInputData(data); // Update the state to trigger a re-render
  };

  console.log(inputData);
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
          {...register('input')}
        />
        {errors.input && (
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
