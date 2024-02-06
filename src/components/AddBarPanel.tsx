export default function AddBarPanel() {
  return (
    <div className=" container mx-auto w-[800px] mt-12">
      <div className="input_table   flex justify-center ">
        <input
          type="text"
          name=""
          id=""
          placeholder="Add task"
          className="bg-slate-300 w-10/12  pl-5"
        />
        <button
          type="submit"
          className="bg-violet-600 py-3 px-5 font-bold text-white uppercase"
        >
          Add todo
        </button>
      </div>
    </div>
  );
}
