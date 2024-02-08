import { useState } from 'react';
import { updateItems } from '../hooks/updateData';
import { deleteItems } from '../hooks/deleteItems';

export default function OriginalBodyTodo({ importData }: any) {
  const [toggleIsDone, setToggleIsDone] = useState<boolean>(false);
  const [editStates, setEditStates] = useState<{ [key: number]: boolean }>({});
  const [editedTitles, setEditedTitles] = useState<{ [key: number]: string }>(
    {}
  );

  const { mutate: updateItemData } = updateItems();
  const { mutate: deleteData } = deleteItems();

  // DELETE METHOD
  const handleDelete = (id: number) => {
    // Perform delete action using the id
    deleteData({ id, data: {} });
  };

  // PUT/UPDATE METHOD
  const handleEdit = (id: number) => {
    setEditStates((prev) => ({ ...prev, [id]: true }));
    const updatedData = {
      title: editedTitles[id] || '', // Use the edited title if available, otherwise use an empty string
      isDone: editStates[id] || false, // Use the edited state if available, otherwise default to false
    };
    updateItemData({ id, data: updatedData });
  };

  //PUT/UPDATE METHOD
  const handleIsDone = (id: number, title: string) => {
    setEditStates((prev) => ({ ...prev, [id]: false })); // Set edit state to false when toggling isDone
    setToggleIsDone((prev) => !prev); // Toggle the isDone state for the specific task

    const updatedData = {
      title: title,
      isDone: !toggleIsDone, // Toggle the isDone state based on the current state of the task
    };

    updateItemData({ id, data: updatedData });
    console.log(updatedData);
  };

  return (
    <div className="container mx-auto w-[800px] mt-12">
      {/* start */}
      {importData.map((item: any) => {
        const { title, isDone } = item.attributes;
        const { id } = item;

        return isDone ? (
          <div
            className="task_table w-full  border-4 border-violet-900 flex justify-between px-6 py-4 my-2"
            key={id}
            data-id={id}
          >
            <div className="task_table_inputs flex justify-start items-center ">
              <div
                className="cube w-4 h-4 bg-violet-300 mr-10 cursor-pointer"
                onClick={() => {
                  handleIsDone(id, title);
                }}
              ></div>
              <div className="relative">
                <h1 className="uppercase text-violet-300 font-bold text-xl">
                  <span className="w-full h-1 bg-violet-300 z-10 absolute mt-[13px]"></span>
                  {title}
                </h1>
              </div>
            </div>
            {/* ICONS */}
            <div className="task_table_inputs flex justify-start items-center gap-x-9">
              {/* THE TRASH ICON */}
              <div
                className="w-4 h-4  cursor-pointer"
                onClick={() => {
                  handleDelete(id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill=" rgb(196 181 253)"
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </div>
              {/* THE PEN ICON */}
              <div
                className="w-4 h-4 cursor-pointer"
                onClick={() => handleEdit(id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill=" rgb(196 181 253)"
                >
                  <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="task_table w-full  border-4 border-violet-900 flex justify-between px-6 py-4 my-2"
            key={id}
            data-id={id}
          >
            <div className="task_table_inputs flex justify-start items-center ">
              {' '}
              <div
                className="cube w-4 h-4 bg-violet-600 mr-10 cursor-pointer"
                onClick={() => {
                  handleIsDone(id, title);
                }}
              ></div>
              <div className="relative">
                {editStates[id] ? (
                  <input
                    type="text"
                    className="border"
                    value={editedTitles[id] || ''}
                    onChange={(e) =>
                      setEditedTitles((prev) => ({
                        ...prev,
                        [id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleEdit(id); // Save the edited value when Enter is pressed
                      }
                    }}
                  />
                ) : (
                  <h1
                    className={`uppercase ${
                      isDone ? 'text-violet-300' : 'text-violet-600'
                    } font-bold text-xl`}
                  >
                    {title}
                  </h1>
                )}
              </div>
            </div>
            {/* ICONS */}
            <div className="task_table_inputs flex justify-start items-center gap-x-9">
              {/* THE TRASH ICON */}
              <div
                className="w-4 h-4  cursor-pointer"
                onClick={() => handleDelete(id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill=" rgb(109 40 217)"
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </div>
              {/* THE PEN ICON */}
              <div
                className="w-4 h-4  cursor-pointer"
                onClick={() => handleEdit(id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill=" rgb(109 40 217)"
                >
                  <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
