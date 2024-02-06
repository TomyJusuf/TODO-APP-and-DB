import axios from 'axios';
import { useEffect, useState } from 'react';

export default function BodyTodoTable() {
  const [artists, setArtists] = useState<any>({});

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/todos');
      // console.log(response.data);
      setArtists(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Data not found');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(artists.data);
  const arr: any | undefined = artists.data;

  if (arr === undefined) {
    return false;
  }
  arr.map((element: any) => {
    console.log(element.attributes);
  });
  return (
    <div className="container mx-auto w-[800px] mt-12">
      <div className="task_table w-full  border-4 border-violet-500 flex justify-between px-6 py-4 my-2">
        <div className="task_table_inputs flex justify-start items-center ">
          <div className="cube w-4 h-4 bg-violet-500 mr-2"></div>
          <h1 className="uppercase text-violet-500 font-bold">peter</h1>
        </div>
        {/* ICONS */}
        <div className="task_table_inputs flex justify-start items-center gap-x-3">
          {/* THE TRASH ICON */}
          <div className="w-4 h-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill=" rgb(139 92 246)"
            >
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </div>
          {/* THE PEN ICON */}
          <div className="w-4 h-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill=" rgb(139 92 246)"
            >
              <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
